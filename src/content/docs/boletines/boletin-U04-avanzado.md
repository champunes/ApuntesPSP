---
title: Boletín UD 5 — Avanzado
description: Ejercicios avanzados de Sockets TCP y UDP
---

# 💪 Boletín UD 5 — Avanzado

> Ejercicios que requieren aplicar los conceptos de sockets TCP y UDP de forma más profunda, con programas completos: clientes interactivos, `select()`, timeouts, NTP y comparativas de protocolo.

---

## 1. Servidor que cuenta caracteres

Crea un servidor que reciba un texto y devuelva el número de caracteres (ej: "hola" → "4").

**Pista:** recibe con `recv(1024).decode()`, calcula `len(texto)` y envía el resultado con `str(...).encode()`.

## 2. Cliente interactivo

Crea un cliente que pida texto por teclado con `input()`, lo envíe al servidor y muestre la respuesta. El bucle termina cuando el usuario escribe "salir".

**Pista:** envuelve el `input()` + `sendall()` + `recv()` en un `while True` y rompe el bucle con `break` cuando el texto sea `"salir"`.

## 3. Servidor de mayúsculas

El cliente envía texto, el servidor lo devuelve en MAYÚSCULAS.

**Pista:** recibe los datos con `recv(1024).decode()`, aplica `.upper()` y envía el resultado con `sendall(...)`.

## 4. Cliente con reconexión

Cliente que intenta conectar, y si falla, reintenta hasta 3 veces con 2s de espera.

**Pista:** envuelve `socket.connect()` en un bucle `for` con `try/except`. Captura `ConnectionRefusedError` y `socket.timeout`, espera 2s con `time.sleep(2)` y reintenta.

## 5. Servidor que gestiona múltiples conexiones (sin hilos)

Usa `select.select()` para atender a varios clientes en un solo hilo.

**Pista:** configura el socket servidor como no bloqueante con `setblocking(False)`. `select.select()` te devuelve los sockets que tienen datos listos para leer. Si el socket listo es el servidor, acepta una nueva conexión; si es un cliente, recibe datos.

## 6. Timeout personalizado

Crea un servidor que cierre la conexión si el cliente no envía datos en 10 segundos.

**Pista:** después de `accept()`, llama a `conn.settimeout(10)`. Captura `socket.timeout` y envía un mensaje de despedida antes de cerrar.

## 7. Cliente NTP manual

Crea un cliente UDP que obtenga la hora actual desde `pool.ntp.org` usando el puerto 123. Envía un paquete de 48 bytes (el primero con valor `\x1b` y el resto `\0`). Extrae el timestamp de los bytes 40 a 43 con `struct.unpack('!I', ...)` y ajústalo restando 2208988800 para convertirlo a hora Unix.

**Pista:** añade `s.settimeout(5)` antes del `recvfrom()`: si la respuesta se pierde (UDP), lanza una excepción en lugar de bloquearse para siempre.

## 8. Servidor UDP multimensaje

Crea un servidor UDP que reciba y responda a 3 mensajes consecutivos en un bucle antes de cerrarse. Cada respuesta debe incluir el número de orden: `"OK #1"`, `"OK #2"`, `"OK #3"`.

**Pista:** usa `for i in range(1, 4)` en lugar de `while True`: así el servidor se cierra solo tras la tercera respuesta. El `with` libera el socket al salir.

## 9. Ping UDP

Cliente manda "PING", servidor responde "PONG". Mide cuánto tarda.

**Pista:** necesitas dos funciones (servidor y cliente) ejecutándose en paralelo. Usa `threading.Thread` con `daemon=True` para lanzar el servidor. Mide el tiempo con `time.time()` antes y después del intercambio de mensajes.

## 10. Servidor en todas las interfaces

El servidor escucha en todas las interfaces y responde a cualquiera.

**Pista:** el servidor debe escuchar en `"0.0.0.0"` para aceptar conexiones de cualquier interfaz. Usa un bucle infinito con `recvfrom()` y responde con `sendto()` a la dirección de cada cliente.

> Nota: no es *broadcast* (eso exigiría `SO_BROADCAST` y enviar a `255.255.255.255`); es un servidor que escucha en todas las interfaces.

## 11. Compara TCP y UDP

Escribe un programa que mida cuánto tarda en completar 10 intercambios de mensajes contra un servidor TCP y contra un servidor UDP en local. Compara los tiempos.

**Pista:** en TCP cada intercambio exige `connect()` (handshake); en UDP basta un `sendto()` + `recvfrom()`. Mide con `time.time()` antes y después de cada bucle.

## 12. Mini servidor web

Crea un servidor TCP que escuche en `127.0.0.1:8080`, acepte una conexión, lea la petición (ignorándola) y responda con `HTTP/1.1 200 OK` y un HTML con `"<h1>Hola mundo</h1>"`.

**Pista:** usa `SO_REUSEADDR` con `setsockopt()` para poder relanzar el servidor sin esperar. Abre `http://127.0.0.1:8080` en el navegador para verlo.

---

📚 [Volver a la unidad](/ApuntesPSP/04-sockets-tcp-y-udp) · Resuelto: [✅ Boletín UD 5 — Avanzado (Resuelto)](/ApuntesPSP/boletines/boletin-u04-avanzado-resuelto)
