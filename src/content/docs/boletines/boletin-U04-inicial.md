---
title: Boletín UD 5 — Inicial
description: Ejercicios básicos de Sockets TCP y UDP
---

# 📝 Boletín UD 5 — Inicial

> Ejercicios básicos para afianzar los conceptos de sockets TCP y UDP: cliente, servidor, eco, la pareja IP/puerto, el HTTP manual y la comparativa de protocolos de la unidad UD 5.

---

## 1. Servidor saludo

Crea un servidor TCP que, cuando un cliente se conecte, le envíe "Bienvenido al servidor" y luego cierre la conexión.

## 2. Cliente que envía y recibe

Crea un cliente que se conecte a 127.0.0.1:9000, envíe "Hola" y luego espere y muestre la respuesta del servidor.

## 3. Servidor eco

Crea un servidor TCP que acepte una conexión, reciba un mensaje y devuelva exactamente lo mismo que recibe.

## 4. IP y puerto

Responde por escrito:

a) ¿Qué identifica la IP y qué identifica el puerto en una comunicación de red?
b) ¿Qué significa `127.0.0.1` y para qué se usa?
c) ¿Qué constante de Python crea un socket TCP y cuál un socket UDP?

**Pista:** repasa el punto 1 de la unidad: la IP identifica la **máquina**, el puerto identifica el **programa**; `127.0.0.1` es **localhost**; y los tipos de socket son `SOCK_STREAM` (TCP) y `SOCK_DGRAM` (UDP).

## 5. Cliente UDP con entrada de usuario

Crea un cliente UDP que pida un mensaje al usuario por teclado con `input()`, lo envíe a `127.0.0.1:9001` y espere una respuesta.

**Pista:** UDP no tiene `connect()`: la dirección va dentro del `sendto()`, y la respuesta llega con `recvfrom()`.

## 6. Servidor UDP con eco personalizado

Crea un servidor UDP que escuche en `127.0.0.1:9001`. Al recibir un mensaje, responda con `"Recibido: "` seguido del mensaje original.

## 7. TCP vs UDP: clasifica

a) Clasifica cada aplicación como TCP o UDP y justifica brevemente:

- Web (HTTP)
- Videollamada (Zoom)
- Correo (SMTP)
- Juego online (Fortnite)
- Transferencia de archivos (FTP)
- DNS

b) Completa la tabla:

| Característica | TCP | UDP |
|---|---|---|
| Conexión | | |
| Entrega garantizada | | |
| Orden | | |
| Velocidad | | |

## 8. Cliente HTTP manual

Conéctate con un socket TCP a `www.example.com:80`, haz un GET a `/` y muestra los primeros 500 caracteres de la respuesta.

**Pista:** envía `"GET / HTTP/1.1\r\nHost: www.example.com\r\nConnection: close\r\n\r\n"` con `sendall()`. Recibe en bucle con `recv(4096)` acumulando bytes hasta que devuelva `b""`, y entonces decodifica.

---

📚 [Volver a la unidad](/ApuntesPSP/04-sockets-tcp-y-udp) · Resuelto: [✅ Boletín UD 5 — Inicial (Resuelto)](/ApuntesPSP/boletines/boletin-u04-inicial-resuelto)
