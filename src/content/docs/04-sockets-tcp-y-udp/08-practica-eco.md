---
title: 08 — Práctica eco
description: "Servidor + cliente eco en TCP y UDP, y ejercicios resueltos 🛠️"
---

<p><small>Servidor + cliente eco en TCP y UDP, y ejercicios resueltos 🛠️</small></p>

> 🗺️ **Estás en:** 🔌 **UD 5 · Sockets TCP y UDP** → 08 · Práctica eco

---

## 📬 La idea en una frase

> La práctica clásica de sockets: un **servidor eco** que devuelve al cliente exactamente lo que recibe. Aquí la montas **dos veces**, una en TCP y otra en UDP, para ver con tus propias manos la diferencia entre canal fiable y datagramas sueltos.

Juntas todo lo aprendido: cliente y servidor TCP (puntos 2-3), `SO_REUSEADDR` y timeouts (punto 4), cliente y servidor UDP (punto 5). Con dos terminales verás cada protocolo completo en acción.

---

## 🛠️ Eco en TCP

```python
import socket

with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000))
    srv.listen()
    print("Servidor eco TCP escuchando en 127.0.0.1:9000")

    conn, addr = srv.accept()
    with conn:
        datos = conn.recv(1024)
        print(f"Recibido de {addr}: {datos.decode()}")
        conn.sendall(datos)  # Eco
```

El truco está en **`conn.sendall(datos)`**: devuelve los **mismos bytes** que llegaron. Eco, literalmente.

```python
import socket

with socket.socket() as cli:
    cli.connect(("127.0.0.1", 9000))
    cli.sendall(b"Prueba")
    print(cli.recv(1024).decode())
```

**Salida** (con el servidor en ejecución en otra terminal):

```
Prueba
```

### 🎭 Be the code — Mano a mano TCP

```
🟢 SERVIDOR                         🔵 CLIENTE
1. socket(AF_INET, SOCK_STREAM)     1. socket(AF_INET, SOCK_STREAM)
2. bind(("127.0.0.1", 9000))        2. connect(("127.0.0.1", 9000))
3. listen()                            → Three-way handshake TCP
4. accept() → espera... ⏳
                                    3. sendall(b"Prueba")
5. accept() devuelve (conn, addr)   4. Esperando respuesta... ⏳
6. recv(1024) → b"Prueba"
7. sendall(b"Prueba")  ← eco
                                    5. recv(1024) → b"Prueba"
                                    6. close()
8. close()
```

> `accept()` y `recv()` son **bloqueantes**: el programa se queda esperando hasta que algo ocurra.

---

## 📡 Eco en UDP

```python
import socket

HOST = "127.0.0.1"
PORT = 9001

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as servidor:
    servidor.bind((HOST, PORT))
    print(f"Servidor eco UDP en {HOST}:{PORT}")

    datos, direccion = servidor.recvfrom(1024)
    print(f"Recibido de {direccion}: {datos.decode()}")

    # Devolver lo mismo que se ha recibido
    servidor.sendto(datos, direccion)
```

**`servidor.sendto(datos, direccion)`** devuelve los **mismos bytes** a la **misma dirección** de la que vinieron. El cliente:

```python
import socket

HOST = "127.0.0.1"
PORT = 9001

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as cliente:
    mensaje = "Hola UDP, devuélveme esto"
    cliente.sendto(mensaje.encode(), (HOST, PORT))
    datos, _ = cliente.recvfrom(1024)
    print(f"El servidor me devolvió: {datos.decode()}")
```

**Salida** del cliente:

```
El servidor me devolvió: Hola UDP, devuélveme esto
```

### 🎭 Be the code — Eco UDP paso a paso

```
1. Servidor: bind(("127.0.0.1", 9001))   → reserva el puerto 9001
2. Servidor: recvfrom(1024)              → se queda escuchando (bloqueado)
3. Cliente:  sendto(b"...", ("127.0.0.1", 9001))
            → el datagrama viaja a 127.0.0.1:9001
4. Servidor: recvfrom() despierta → (datos, direccion)
5. Servidor: sendto(datos, direccion)     → devuelve lo mismo al cliente
6. Cliente:  recvfrom() → recibe el eco y lo imprime
```

La línea 4 es la clave: la **dirección del cliente** aparece por primera vez cuando el servidor la necesita para responder. Ese es el flujo completo de UDP: fuego, escucha, responde.

### ⚖️ Las dos versiones, cara a cara

| | Eco TCP | Eco UDP |
|---|---|---|
| Puerto de prueba | 9000 | 9001 |
| El servidor espera con | `accept()` + `recv()` | `recvfrom()` |
| Devuelve con | `conn.sendall(datos)` | `servidor.sendto(datos, direccion)` |
| ¿Necesita saber quién es el cliente? | La conexión lo sabe | `recvfrom()` le entrega la dirección |
| ¿Atiende a varios a la vez? | De uno en uno (o con hilos) | Cualquiera, sin hilos |

---

## ✏️ Aprieta el lápiz

1. **Eco server TCP**: Crea un servidor que devuelva exactamente lo que recibe.
2. **Eco server UDP**: Crea un servidor UDP que devuelva al cliente lo mismo que recibe.
3. **Contador de letras**: El cliente envía una frase, el servidor responde con la cantidad de letras.
4. **Servidor hora**: El cliente se conecta y el servidor le devuelve la hora actual.
5. **Cliente con timeout**: Crea un cliente que intente conectar, y si no hay respuesta en 3s, muestre "Servidor no disponible".
6. **Comparativa velocidad**: Mide cuánto tarda TCP vs UDP en enviar 100 mensajes pequeños.

<details>
<summary>🔓 Soluciones</summary>

**1. Eco server TCP:**

```python
import socket
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000))
    srv.listen()
    conn, addr = srv.accept()
    with conn:
        datos = conn.recv(1024)
        conn.sendall(datos)
```

**2. Eco server UDP:**

```python
import socket
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as srv:
    srv.bind(("127.0.0.1", 9001))
    datos, direccion = srv.recvfrom(1024)
    srv.sendto(datos, direccion)
```

**3. Contador de letras:**

```python
import socket
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000))
    srv.listen()
    conn, addr = srv.accept()
    with conn:
        texto = conn.recv(1024).decode()
        conn.sendall(str(len(texto)).encode())
```

**4. Servidor hora:**

```python
import socket, time
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000))
    srv.listen()
    conn, addr = srv.accept()
    with conn:
        hora = time.strftime("%H:%M:%S")
        conn.sendall(hora.encode())
```

**5. Cliente con timeout:**

```python
import socket
with socket.socket() as cli:
    cli.settimeout(3)
    try:
        cli.connect(("127.0.0.1", 9000))
        cli.sendall(b"hola")
        print(cli.recv(1024).decode())
    except (socket.timeout, ConnectionRefusedError):
        print("Servidor no disponible")
```

**6. Comparativa velocidad (100 mensajes):**

```python
import socket, time

def test_tcp():
    t = time.time()
    for _ in range(100):
        with socket.socket() as s:
            s.connect(("127.0.0.1", 9000))
            s.send(b"x")
            s.recv(1024)
    return time.time() - t

def test_udp():
    t = time.time()
    for _ in range(100):
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.sendto(b"x", ("127.0.0.1", 9001))
            s.recvfrom(1024)
    return time.time() - t

print(f"TCP: {test_tcp():.3f}s")
print(f"UDP: {test_udp():.3f}s")
```

UDP suele ser más rápido porque no tiene handshake ni confirmaciones por cada mensaje.

> ⚠️ Para el benchmark necesitas en marcha un servidor **TCP en el 9000** y un servidor **UDP en los 9001** (los ejercicios 1 y 2). Sin ellos, TCP lanza `ConnectionRefusedError` y UDP se queda esperando una respuesta que nadie envía.

</details>

---

## 🧠 Mini-chequeo

1. ¿Qué línea convierte a cada servidor (TCP y UDP) en "eco"?
2. ¿Cómo descubre el servidor UDP a quién responder?
3. ¿Qué dos llamadas son bloqueantes en el eco TCP y en el eco UDP?

<details>
<summary>🔄 Respuestas</summary>

1. TCP: **`conn.sendall(datos)`**; UDP: **`servidor.sendto(datos, direccion)`**. Ambas devuelven los mismos bytes recibidos.
2. Con la **dirección** que entrega `recvfrom()`: la tupla `(IP, puerto)` del cliente que mandó el datagrama.
3. TCP: `accept()` y `recv()`; UDP: `recvfrom()`. Todas esperan hasta que algo ocurre.

</details>

---

## ✅ Resumen en 3 frases

- El eco TCP devuelve con `conn.sendall(datos)` lo que recibió con `recv(1024)`, sobre una conexión aceptada con `accept()`.
- El eco UDP devuelve con `sendto(datos, direccion)` lo que recibió con `recvfrom()`, usando la dirección que cada datagrama trae pegada.
- Con el servidor en una terminal y el cliente en otra tienes cada protocolo completo funcionando; UDP atiende a cualquiera sin hilos, TCP de uno en uno.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Eco | El servidor devuelve lo mismo que recibe |
| sendall(datos) | La jugada del eco TCP: reenviar los bytes recibidos |
| sendto(datos, direccion) | La jugada del eco UDP: reenviar a la dirección de origen |
| Bloqueante | accept(), recv() y recvfrom() esperan hasta que algo ocurre |
| Terminal del servidor | Ventana donde el servidor queda escuchando |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/04-sockets-tcp-y-udp) · **Anterior:** [07 · Cuándo usar cada protocolo](/ApuntesPSP/04-sockets-tcp-y-udp/07-cuando-usar-cada-protocolo) · **Siguiente:** [09 · Cierre](/ApuntesPSP/04-sockets-tcp-y-udp/09-cierre)
