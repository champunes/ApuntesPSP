import { spawn, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const PORT = 4321;
const OUT_DIR = 'public/pdf';
const OUT_FILE = 'ApuntesPSP';
const URL = `http://localhost:${PORT}/ApuntesPSP`;

async function main() {
    console.log('🔨 Building site...');
    try {
        execSync('npm run build', { cwd: root, stdio: 'inherit' });
    } catch (e) {
        console.error('❌ Build failed');
        process.exit(1);
    }

    console.log('🚀 Starting local server...');
    // Iniciamos el servidor de vista previa en segundo plano
    const server = spawn('npx', ['astro', 'preview', '--host', '127.0.0.1', '--port', PORT.toString()], {
        cwd: root,
        stdio: 'ignore',
        shell: true,
    });

    // Esperamos 5 segundos a que levante el servidor
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`📖 Generating PDF from ${URL} ...`);

    const starlightArgs = [
        'starlight-to-pdf', URL,
        '-p', OUT_DIR,
        '-f', OUT_FILE,
        '--footer', 'scripts/pdf-footer.html',
        '--header', 'scripts/pdf-header.html',
        '--preceding-html', 'scripts/pdf-cover.html',
        '--print-bg',
        '--timeout', '600000'
    ];

    try {
        execSync(`npx ${starlightArgs.join(' ')}`, { cwd: root, stdio: 'inherit' });
        console.log(`✅ PDF generated: ${OUT_DIR}/${OUT_FILE}.pdf`);
    } catch (error) {
        console.error('❌ PDF generation failed');
    } finally {
        console.log('🛑 Stopping server...');
        server.kill();
    }
}

main();