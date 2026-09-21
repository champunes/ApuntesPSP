import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const OUT_DIR = process.argv[2] || 'public/epub';
const OUT_FILE = 'ApuntesPSP.epub';
const SRC_DIR = 'src/content/docs';

const META_TITLE = 'Apuntes PSP - Programacion de Servicios y Procesos';
const META_LANG = 'es';

const unitSlugs = [
    '00-python-basico',
    '01-procesos-y-subprocess',
    '02-hilos-fundamentos',
    '03-sincronizacion-entre-hilos',
    '04-sockets-tcp',
    '05-sockets-udp-y-protocolos',
    '06-apis-rest-y-http',
    '07-apis-comerciales',
    '08-hash-y-cifrado-clasico',
    '09-cifrado-moderno',
    '10-servidores-concurrentes',
    '11-asyncio-y-disponibilidad',
];

const boletinesCodes = [
    '00', '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11',
];

const boletinSections = [
    'inicial-resuelto',
    'inicial',
    'avanzado-resuelto',
    'avanzado',
];

function getFrontTitle(content, fallback) {
    const fmMatch = content.match(/^---\s*\n([\s\S]+?)\n^---/m);
    if (fmMatch) {
        const titleMatch = fmMatch[1].match(/^title:\s*"?([^"\r\n]+)"?/m);
        if (titleMatch) return titleMatch[1].trim();
    }
    return fallback;
}

function stripFrontmatterAndFixPaths(content) {
    let out = content.replace(/^---[\s\S]*?^---\s*/m, '').trim();
    out = out.replaceAll('/ApuntesPSP/cc-by-sa.png', 'public/cc-by-sa.png');
    out = out.replaceAll('/ApuntesPSP/diagrams/', 'public/diagrams/');
    out = out.replaceAll('/diagrams/', 'public/diagrams/');
    return out;
}

function findFile(basePath) {
    if (fs.existsSync(`${basePath}.md`)) return `${basePath}.md`;
    if (fs.existsSync(`${basePath}.mdx`)) return `${basePath}.mdx`;
    return null;
}

function readFileStripBom(filePath) {
    // Varios ficheros MD del repo llevan BOM (﻿) al principio; si no se
    // quita, las regex de frontmatter (que anclan '---' al inicio de línea)
    // no lo detectan y pandoc falla al parsear el YAML.
    return fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
}

function addMdFile(chunks, filePath, headingLevel) {
    const content = readFileStripBom(filePath);
    const fallback = path.basename(filePath, path.extname(filePath));
    const title = getFrontTitle(content, fallback);
    const body = stripFrontmatterAndFixPaths(content);

    chunks.push(`${'#'.repeat(headingLevel)} ${title}\n`);
    if (body) chunks.push(`${body}\n`);
}

function addBoletin(chunks, filePath) {
    const content = readFileStripBom(filePath);
    const fallback = path.basename(filePath, path.extname(filePath));
    const title = getFrontTitle(content, fallback);
    let body = stripFrontmatterAndFixPaths(content);
    body = body.replace(/^(#+)/gm, '##$1');

    chunks.push(`## ${title}\n`);
    if (body) chunks.push(`${body}\n`);
}

function findPandoc() {
    if (process.platform === 'win32') {
        const wingetDir = path.join(
            process.env.LOCALAPPDATA || '',
            'Microsoft', 'WinGet', 'Packages'
        );
        if (fs.existsSync(wingetDir)) {
            const found = findFileRecursive(wingetDir, 'pandoc.exe');
            if (found) return found;
        }
    }
    return 'pandoc';
}

function findFileRecursive(dir, filename) {
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
        return null;
    }
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const found = findFileRecursive(full, filename);
            if (found) return found;
        } else if (entry.name.toLowerCase() === filename.toLowerCase()) {
            return full;
        }
    }
    return null;
}

function main() {
    const outDirAbs = path.resolve(root, OUT_DIR);
    const outPath = path.join(outDirAbs, OUT_FILE);
    const coverPath = path.join(root, 'public', 'portada.png');
    const cssPath = path.join(__dirname, 'epub.css');

    fs.mkdirSync(outDirAbs, { recursive: true });

    const chunks = [
        '---',
        `title: '${META_TITLE}'`,
        `author: 'José Ángel González Molina'`,
        `language: ${META_LANG}`,
        '---',
        '',
    ];

    for (const unit of unitSlugs) {
        // --- Índice de la unidad (fichero raíz, p. ej. 01-procesos-y-subprocess.md) ---
        const indexFile = findFile(path.join(root, SRC_DIR, unit));
        if (indexFile) addMdFile(chunks, indexFile, 1);

        // --- Puntos de la unidad (subcarpeta, p. ej. 01-procesos-y-subprocess/01-*.md) ---
        const unitDir = path.join(root, SRC_DIR, unit);
        if (fs.existsSync(unitDir) && fs.statSync(unitDir).isDirectory()) {
            const puntos = fs.readdirSync(unitDir)
                .filter((f) => f.endsWith('.md'))
                .sort();
            for (const p of puntos) {
                addMdFile(chunks, path.join(unitDir, p), 1);
            }
        }

        // --- Boletines de la unidad ---
        const code = unit.split('-')[0];
        if (boletinesCodes.includes(code)) {
            for (const sec of boletinSections) {
                const bfName = `boletin-U${code}-${sec}`;
                const bfFile = findFile(path.join(root, SRC_DIR, 'boletines', bfName));
                if (bfFile) addBoletin(chunks, bfFile);
            }
        }
    }

    const tempMd = path.join(os.tmpdir(), `apuntespsp-epub-${Date.now()}.md`);
    fs.writeFileSync(tempMd, chunks.join('\n'), 'utf8');

    const pandoc = findPandoc();
    console.log(`📖 Generating EPUB with pandoc (${pandoc})...`);

    try {
        execFileSync(pandoc, [
            tempMd,
            '--from', 'markdown',
            '--to', 'epub3',
            '--toc',
            '--toc-depth=3',
            `--epub-cover-image=${coverPath}`,
            '--highlight-style', 'pygments',
            '--css', cssPath,
            '-o', outPath,
        ], { cwd: root, stdio: 'inherit' });
        console.log(`✅ EPUB generated: ${path.join(OUT_DIR, OUT_FILE)}`);
    } catch (error) {
        console.error('❌ EPUB generation failed');
        process.exitCode = 1;
    } finally {
        fs.rmSync(tempMd, { force: true });
    }
}

main();
