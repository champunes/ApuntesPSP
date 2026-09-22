---
title: Boletín UD 5 — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de Sockets TCP y UDP
---

# ✅ Boletín UD 5 — Inicial (Resuelto)

---

## 1. Servidor saludo

```python
import socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as srv:
    srv.bind(("127.0.0.1", 9000))
    srv.listen()
    conn, addr = srv.accept()
    with conn:
        conn.sendall(b"Bienvenido al servidor")
```

`accept()` espera un cliente (bloqueante). Al salir del `with`, la conexión se cierra solo.

## 2. Cliente que envía y recibe

```python
import socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as cli:
    cli.connect(("127.0.0.1", 9000))
    cli.sendall(b"Hola")
    respuesta = cli.recv(1024)
    print(f"Respuesta: {respuesta.decode()}")
```

`connect()` lanza `ConnectionRefusedError` si no hay servidor.

## 3. Servidor eco

```python
import socket
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000))
    srv.listen()
    conn, addr = srv.accept()
    with conn:
        datos = conn.recv(1024)
        conn.sendall(datos)  # Eco
```

Devuelve exactamente lo mismo que recibe.

## 4. IP y puerto

a) La **IP** identifica la **máquina** en la red; el **puerto** identifica el **programa** dentro de esa máquina.

b) **`127.0.0.1`** es **localhost**: tu propia máquina. Se usa para probar sin red real.

c) **TCP** → `socket.SOCK_STREAM`; **UDP** → `socket.SOCK_DGRAM`. Ambos con familia `AF_INET`.

## 5. Cliente UDP con entrada de usuario

```python
import socket

HOST = "127.0.0.1"
PORT = 9001

mensaje = input("Escribe tu mensaje: ")
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as cliente:
    cliente.sendto(mensaje.encode(), (HOST, PORT))
    datos, _ = cliente.recvfrom(1024)
    print(f"Respuesta: {datos.decode()}")
```

El cliente UDP no tiene `connect()`: la dirección va dentro del `sendto()`, y la respuesta llega con `recvfrom()`.

## 6. Servidor UDP con eco personalizado

```python
import socket

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as srv:
    srv.bind(("127.0.0.1", 9001))
    datos, direccion = srv.recvfrom(1024)
    print(f"Recibido de {direccion}: {datos.decode()}")
    srv.sendto(f"Recibido: {datos.decode()}".encode(), direccion)
```

Se responde con la **dirección** que devuelve `recvfrom()`: sin ella no hay forma de contestar en UDP.

## 7. TCP vs UDP: clasifica

a) **TCP:** Web (HTTP), Correo (SMTP), Transferencia de archivos (FTP) → el dato debe llegar **completo y en orden**. **UDP:** Videollamada (Zoom), Juego online (Fortnite), DNS → la **velocidad** importa más; perder un paquete se tolera o se repite.

b)

| Característica | TCP | UDP |
|---|---|---|
| Conexión | **Sí (handshake)** | **No** |
| Entrega garantizada | **Sí** | **No** |
| Orden | **Sí** | **No** |
| Velocidad | **Más lento** | **Más rápido** |

## 8. Cliente HTTP manual

```python
import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(("www.example.com", 80))
    peticion = (
        "GET / HTTP/1.1\r\n"
        "Host: www.example.com\r\n"
        "Connection: close\r\n"
        "\r\n"
    )
    s.sendall(peticion.encode())

    respuesta = b""
    while True:
        datos = s.recv(4096)
        if not datos:
            break
        respuesta += datos

print(respuesta.decode()[:500])
```

HTTP es texto sobre TCP: mandas una petición con `sendall()` y recibes la respuesta en trozos hasta que `recv()` devuelve `b""` (el servidor cerró la conexión gracias a `Connection: close`).

---

📚 [Volver a la unidad](/ApuntesPSP/04-sockets-tcp-y-udp) · Por resolver: [📝 Boletín UD 5 — Inicial](/ApuntesPSP/boletines/boletin-u04-inicial)
