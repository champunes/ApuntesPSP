---
title: UD 5 — Sockets TCP y UDP
description: "Comunicaciones en red: clientes, servidores y protocolos 🔌"
nav_order: 04
---

<p><small>Comunicaciones en red: clientes, servidores y protocolos 🔌</small></p>

---

> "Un socket es como un teléfono: marcas, esperas a que contesten, habláis y colgáis. La diferencia es que TCP garantiza que cada palabra llegue; UDP lanza el mensaje y reza."

En la UD 4 sincronizaste hilos para que no se pisen entre sí dentro de un mismo programa. Ahora toca lo contrario: hacer que **procesos distintos, incluso en máquinas distintas, hablen entre ellos**. La herramienta son los **sockets**: TCP para cuando necesitas fiabilidad, UDP para cuando necesitas velocidad.

En esta unidad construirás tu primera conversación entre programas: un **cliente** que llama y un **servidor** que contesta. Aprenderás el three-way handshake de TCP, los errores típicos cuando la red se rompe, y también cómo usar UDP para datagramas sin conexión. Al final, montarás servidores eco en ambos protocolos.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar qué es un **socket** y para qué sirven la **IP** y el **puerto**.
- Distinguir **TCP** (fiable, con conexión) de **UDP** (rápido, sin conexión).
- Implementar un **cliente TCP** con `connect()`, `sendall()` y `recv()`.
- Implementar un **servidor TCP** con `bind()`, `listen()` y `accept()`.
- Describir el **three-way handshake** y el cierre de una conexión TCP.
- Gestionar **errores de red** con `try/except`.
- Configurar **SO_REUSEADDR** y **timeouts** para servidores robustos.
- Implementar un **cliente UDP** con `sendto()` y `recvfrom()`.
- Implementar un **servidor UDP** con `bind()` y `recvfrom()`.
- Hablar **HTTP** a nivel de socket y entender **NTP** sobre UDP.
- Decidir cuándo usar TCP y cuándo UDP en un caso real.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Qué es un socket](/ApuntesPSP/04-sockets-tcp-y-udp/01-que-es-un-socket) | IP + puerto, TCP vs UDP, la analogía del teléfono | Todos |
| [02 · Cliente TCP](/ApuntesPSP/04-sockets-tcp-y-udp/02-cliente-tcp) | `connect()`, `sendall()` y `recv()`: el cliente que habla primero | Todos |
| [03 · Servidor TCP](/ApuntesPSP/04-sockets-tcp-y-udp/03-servidor-tcp) | `bind()`, `listen()` y `accept()`: el servidor que escucha | Todos |
| [04 · Ciclo de vida de la conexión](/ApuntesPSP/04-sockets-tcp-y-udp/04-ciclo-de-vida-de-la-conexion) | Three-way handshake y cierre de la conexión TCP | Todos |
| [05 · Errores y gestión](/ApuntesPSP/04-sockets-tcp-y-udp/05-errores-y-manejo) | `ConnectionResetError`, timeouts y `try/except` | Todos |
| [06 · SO_REUSEADDR](/ApuntesPSP/04-sockets-tcp-y-udp/06-so-reuseaddr) | "Address already in use", TIME_WAIT y cómo evitarlo | Todos |
| [07 · Protocolos sobre TCP](/ApuntesPSP/04-sockets-tcp-y-udp/07-protocolos-sobre-tcp) | HTTP hablado a pelo con un socket | Todos |
| [08 · Servidor eco completo](/ApuntesPSP/04-sockets-tcp-y-udp/08-servidor-eco-completo) | Servidor + cliente eco, mano a mano TCP | Todos |
| [09 · Cierre](/ApuntesPSP/04-sockets-tcp-y-udp/09-cierre) | Sé el socket, Fireside, Laboratorio de tortura… | Todos |

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesPSP/boletines/boletin-u04-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesPSP/boletines/boletin-u04-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesPSP/boletines/boletin-u04-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesPSP/boletines/boletin-u04-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA3)

**RA3 — Sockets: comunicaciones en red con TCP/UDP y protocolos de aplicación.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA3a | Modelo de capas de red (TCP/IP) | ✅ Punto 1 |
| RA3b | Protocolo UDP | ✅ Punto 1 |
| RA3c | Crea servidores TCP | ✅ Puntos 3 y 8 + ⚡ Laboratorio (punto 9) |
| RA3d | Crea clientes TCP | ✅ Puntos 2 y 8 + ⚡ Laboratorio (punto 9) |
| RA3e | Crea servidores y clientes UDP | ✅ Punto 1 + ⚡ Laboratorio (punto 9) |
| RA3f | Gestiona errores de red | ✅ Punto 5 + ⚡ Laboratorio (punto 9) |
| RA3g | Configura opciones de socket | ✅ Puntos 5 y 6 |
| RA3h | Protocolos HTTP/NTP sobre sockets | ✅ Punto 7 |

---

## 🚪 ¿Por dónde empiezo?

¿Vienes de la UD 4 y dominas hilos y sincronización? Empieza por el [punto 1](/ApuntesPSP/04-sockets-tcp-y-udp/01-que-es-un-socket), que parte de cero: qué es un socket, la IP y el puerto.

¿Ya sabes qué es un socket? Saltar al [punto 3](/ApuntesPSP/04-sockets-tcp-y-udp/03-servidor-tcp), al [5](/ApuntesPSP/04-sockets-tcp-y-udp/05-errores-y-manejo) o al [6](/ApuntesPSP/04-sockets-tcp-y-udp/06-so-reuseaddr).

**📍 Primer punto:** [01 · Qué es un socket](/ApuntesPSP/04-sockets-tcp-y-udp/01-que-es-un-socket)
**⏭️ Al acabar la unidad, continúa en [UD 6 · Servidores concurrentes](/ApuntesPSP/05-servidores-concurrentes).**
