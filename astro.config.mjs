import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const emojis = ['🐍', '🚀', '🔀', '🔒', '🔌', '🏗️', '🌐', '🧪', '🔐', '⏱️', '☕'];

const unitSlugs = [
  '01-python-basico',
  '02-gestion-de-procesos',
  '03-hilos-y-concurrencia',
  '04-sincronizacion',
  '05-sockets-tcp-y-udp',
  '06-servidores-concurrentes',
  '07-http-y-apis-rest',
  '08-apis-comerciales',
  '09-seguridad-y-cifrado',
  '10-alta-disponibilidad',
  '11-spring-boot',
];

const unitLabels = [
  'Python 3 básico',
  'Gestión de procesos',
  'Hilos y concurrencia',
  'Sincronización',
  'Sockets TCP y UDP',
  'Servidores concurrentes',
  'HTTP y APIs REST',
  'APIs Comerciales',
  'Seguridad y cifrado',
  'Alta disponibilidad',
  'Spring Boot con Java',
];

// Unidades ampliadas al estándar "libro" (índice + 9 puntos). Se activan por lote.
const unidadesExpandidas = {
  '01-python-basico': true,
  '02-gestion-de-procesos': true,
  '03-hilos-y-concurrencia': true,
  '04-sincronizacion': true,
  '05-sockets-tcp-y-udp': true,
  '06-servidores-concurrentes': true,
  '07-http-y-apis-rest': true,
  '08-apis-comerciales': true,
  '09-seguridad-y-cifrado': true,
  '10-alta-disponibilidad': true,
  '11-spring-boot': true,
};

// Unidades con boletines publicados en src/content/docs/boletines/
const boletinesReady = [
  '01-python-basico',
  '02-gestion-de-procesos',
  '03-hilos-y-concurrencia',
  '04-sincronizacion',
  '05-sockets-tcp-y-udp',
  '06-servidores-concurrentes',
  '07-http-y-apis-rest',
  '08-apis-comerciales',
  '09-seguridad-y-cifrado',
  '10-alta-disponibilidad',
  '11-spring-boot',
];

// Nombres de los puntos de teoría de cada unidad ampliada (nn-archivo)
const unitPuntos = {
  '01-python-basico': ['01-introduccion', '02-comentarios', '03-tipos-de-datos', '04-variables-y-colecciones', '05-control-de-flujo', '06-funciones', '07-clases', '08-modulos-y-avanzado', '09-cierre'],
  '02-gestion-de-procesos': ['01-que-es-un-proceso', '02-estados-de-un-proceso', '03-paralela-vs-distribuida', '04-subprocess-run', '05-subprocess-popen', '06-comunicacion-con-procesos', '07-compatibilidad-windows-linux', '08-multiprocessing', '09-procesos-en-la-practica', '10-cierre'],
  '03-hilos-y-concurrencia': ['01-de-proceso-a-hilo', '02-primer-hilo', '03-hilos-con-argumentos', '04-hilos-daemon', '05-timer', '06-gil', '07-estados-del-hilo', '08-hilos-en-la-practica', '09-cierre'],
  '04-sincronizacion': ['01-condicion-de-carrera', '02-lock', '03-rlock', '04-semaphore', '05-barrier', '06-condition', '07-productor-consumidor', '08-buenas-practicas', '09-python-free-threaded', '10-cierre'],
  '05-sockets-tcp-y-udp': ['01-que-es-un-socket', '02-cliente-tcp', '03-servidor-tcp', '04-ciclo-y-errores', '05-cliente-y-servidor-udp', '06-http-y-ntp', '07-cuando-usar-cada-protocolo', '08-practica-eco', '09-cierre'],
  '07-http-y-apis-rest': ['01-web-y-http', '02-metodos-http', '03-principios-rest', '04-codigos-de-estado', '05-json', '06-requests-get', '07-requests-post', '08-practica-api', '09-cierre'],
  '08-apis-comerciales': ['01-api-keys', '02-variables-de-entorno', '03-openweathermap', '04-openai', '05-rate-limiting', '06-errores-http', '07-seguridad-y-buenas-practicas', '08-practica-apis-comerciales', '09-cierre'],
  '09-seguridad-y-cifrado': ['01-principios-de-seguridad', '02-hash-y-huellas-digitales', '03-contrasenas-seguras', '04-cifrado-clasico', '05-cifrado-simetrico-aes', '06-cifrado-asimetrico-rsa', '07-firmas-digitales', '08-cifrado-hibrido-y-practica', '09-cierre'],
  '06-servidores-concurrentes': ['01-servidor-secuencial', '02-el-problema-de-la-espera', '03-hilo-por-cliente', '04-threadpoolexecutor', '05-benchmark', '06-sincronizacion-en-servidores', '07-limites-y-buenas-practicas', '08-servidor-concurrente-completo', '09-cierre'],
  '10-alta-disponibilidad': ['01-event-loop', '02-corrutinas', '03-create-task-y-gather', '04-timeouts', '05-heartbeat', '06-backoff', '07-threads-vs-asyncio', '08-disponibilidad-y-practica', '09-cierre'],
  '11-spring-boot': ['01-java-para-python', '02-introduccion-spring-boot', '03-inyeccion-de-dependencias', '04-restcontroller-y-apis', '05-jpa-y-bases-de-datos', '06-ejemplo-completo', '07-cierre'],
};

const titleCase = (s) => s.split(' ').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

// Items del grupo de una unidad ampliada: índice + 9 puntos
const expandedUnitItems = (slug) => {
  const files = unitPuntos[slug];
  return [
    { slug, label: 'Índice' },
    ...files.map((file) => {
      const num = file.slice(0, 2);
      let label;
      if (file.endsWith('-cierre')) {
        label = `${num} · Cierre`;
      } else {
        label = `${num} · ${titleCase(file.slice(3).replace(/-/g, ' '))}`;
      }
      return { slug: `${slug}/${file}`, label };
    }),
  ];
};

// Grupo de boletines de una unidad (4 ficheros)
const boletinItems = (slug) => {
  const nn = slug.split('-')[0];
  return [
    { link: `/boletines/boletin-u${nn}-inicial`, label: '🟢 Inicial por resolver' },
    { link: `/boletines/boletin-u${nn}-inicial-resuelto`, label: '✅ Inicial resuelto' },
    { link: `/boletines/boletin-u${nn}-avanzado`, label: '📝 Avanzado por resolver' },
    { link: `/boletines/boletin-u${nn}-avanzado-resuelto`, label: '💪 Avanzado resuelto' },
  ];
};

const unitsSidebar = unitSlugs.map((slug, i) => {
  const label = `${emojis[i]} ${i + 1}. ${unitLabels[i]}`;
  if (unidadesExpandidas[slug]) {
    return { label, collapsed: true, items: expandedUnitItems(slug) };
  }
  return { slug, label };
});

const boletinesSidebar = boletinesReady.length > 0
  ? [
      {
        label: '📝 Boletines',
        items: boletinesReady.map((slug, i) => ({
          label: `${emojis[i]} Unidad ${i + 1}`,
          collapsed: true,
          items: boletinItems(slug),
        })),
      },
    ]
  : [];

export default defineConfig({
  site: 'https://champunes.github.io/ApuntesPSP',
  base: '/ApuntesPSP',
  integrations: [
    starlight({
      title: 'Apuntes PSP',
      description: 'Programación de Servicios y Procesos — Python. CC BY-SA 4.0 — José A. González',
      customCss: [
        './src/styles/custom.css',
        '@fontsource/geist-sans',
      ],
      locales: {
        root: { label: 'Español', lang: 'es' },
      },
      defaultLocale: 'root',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/champunes/ApuntesPSP' },
      ],
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#306998' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: '/ApuntesPSP/favicon.svg' } },
      ],
      sidebar: [
        {
          slug: 'index',
          label: 'Inicio',
        },
        {
          label: '📚 Unidades',
          items: unitsSidebar,
        },
        ...boletinesSidebar,
      ],
    }),
  ],
});
