---
title: Boletín UD 5 — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de Sockets TCP y UDP
---

# 💪 Boletín UD 5 — Avanzado (Resuelto)

---

## 1. Servidor que cuenta caracteres

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

`len(texto)` cuenta los caracteres del texto recibido y se devuelve como texto (`str`) convertido a bytes con `.encode()`. Si el cliente envía `"hola"`, recibe `"4"`.

## 2. Cliente interactivo

```python
import socket
with socket.socket() as cli:
    cli.connect(("127.0.0.1", 9000))
    while True:
        mensaje = input("Escribe (o 'salir'): ")
        if mensaje == "salir":
            break
        cli.sendall(mensaje.encode())
        respuesta = cli.recv(1024).decode()
        print(f"Respuesta: {respuesta}")
```

El `while True` mantiene el diálogo abierto. Cuando el usuario escribe `"salir"`, el `break` rompe el bucle y el `with` cierra el socket.

## 3. Servidor de mayúsculas

```python
import socket
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000))
    srv.listen()
    conn, addr = srv.accept()
    with conn:
        texto = conn.recv(1024).decode()
        conn.sendall(texto.upper().encode())
```

`texto.upper()` convierte el texto recibido a MAYÚSCULAS y se devuelve como bytes con `.encode()`.

## 4. Cliente con reconexión

```python
import socket, time

host = "127.0.0.1"
port = 9000

for intento in range(3):
    try:
        with socket.socket() as cli:
            cli.settimeout(2)
            cli.connect((host, port))
            cli.sendall(b"test")
            print(f"Conectado en el intento {intento + 1}")
            break
    except (ConnectionRefusedError, socket.timeout):
        print(f"Intento {intento + 1} fallido, esperando 2s...")
        time.sleep(2)
else:
    print("Servidor no disponible tras 3 intentos")
```

El `for` reintenta hasta 3 veces. Cada `except` captura el fallo (rechazo o timeout) y espera 2s con `time.sleep(2)`. El `break` sale si se conecta; el `else` del `for` se ejecuta solo si nunca hubo `break`.

## 5. Servidor que gestiona múltiples conexiones (sin hilos)

```python
import socket, select

servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
servidor.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
servidor.bind(("127.0.0.1", 9000))
servidor.listen()
servidor.setblocking(False)  # no bloqueante

clientes = []
print("Servidor atendiendo hasta 3 clientes con select...")

while True:
    lectura, _, _ = select.select([servidor] + clientes, [], [], 1.0)

    for sock in lectura:
        if sock is servidor:
            conn, addr = servidor.accept()
            conn.setblocking(False)
            clientes.append(conn)
            print(f"Conectado {addr}, hay {len(clientes)} cliente(s)")
        else:
            datos = sock.recv(1024)
            if datos:
                sock.sendall(datos)  # eco
            else:
                clientes.remove(sock)
                sock.close()
```

El servidor **no bloqueante** más `select.select()` permite esperar a la vez en el socket servidor y en los sockets de los clientes. Cuando el socket listo es el servidor, se acepta una conexión nueva; cuando es un cliente, se leen sus datos. Sin hilos: un solo hilo atiende a todos.

## 6. Timeout personalizado

```python
import socket
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000))
    srv.listen()
    conn, addr = srv.accept()
    with conn:
        conn.settimeout(10)
        try:
            datos = conn.recv(1024)
            print(f"Recibido: {datos.decode()}")
        except socket.timeout:
            conn.sendall(b"Hasta luego")
            print("Cliente inactivo, cerrando conexión")
```

`conn.settimeout(10)` da al cliente 10 segundos para enviar datos. Si no lo hace, `recv()` lanza `socket.timeout` y el servidor se despide antes de cerrar.

## 7. Cliente NTP manual

```python
import socket, struct, time

def hora_ntp():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.settimeout(5)
        paquete = b'\x1b' + 47 * b'\0'
        s.sendto(paquete, ("pool.ntp.org", 123))
        datos, _ = s.recvfrom(1024)

    t = struct.unpack('!I', datos[40:44])[0]
    return t - 2208988800

hora = hora_ntp()
print(f"Hora NTP oficial: {time.ctime(hora)}")
```

El `settimeout(5)` evita que el `recvfrom()` se quede bloqueado si el datagrama de respuesta se pierde (muy UDP). El timestamp se desempaqueta de los bytes 40-43 con `struct.unpack('!I', ...)` y se ajusta restando **2208988800** segundos de época.

## 8. Servidor UDP multimensaje

```python
import socket
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as srv:
    srv.bind(("127.0.0.1", 9001))
    for i in range(1, 4):
        datos, direccion = srv.recvfrom(1024)
        print(f"Mensaje {i} de {direccion}: {datos.decode()}")
        srv.sendto(f"OK #{i}".encode(), direccion)
```

Con `for i in range(1, 4)` el servidor responde a 3 mensajes y se cierra solo al salir del bucle (el `with` libera el socket). Cada respuesta lleva su número de orden.

## 9. Ping UDP

```python
import socket, time, threading

def servidor():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as srv:
        srv.bind(("127.0.0.1", 9001))
        datos, direccion = srv.recvfrom(1024)
        srv.sendto(b"PONG", direccion)

threading.Thread(target=servidor, daemon=True).start()

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as cli:
    inicio = time.time()
    cli.sendto(b"PING", ("127.0.0.1", 9001))
    datos, _ = cli.recvfrom(1024)
    fin = time.time()

print(f"PONG recibido en {fin - inicio:.4f} segundos")
```

El servidor se ejecuta en un hilo `daemon` mientras el cliente mide el tiempo de ida y vuelta. Ese tiempo es el **RTT** (round-trip time), la métrica de latencia de las redes.

## 10. Servidor en todas las interfaces

```python
import socket

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as servidor:
    servidor.bind(("0.0.0.0", 9001))
    print("Servidor escuchando en todas las interfaces...")
    while True:
        datos, direccion = servidor.recvfrom(1024)
        print(f"Datagrama de {direccion}: {datos.decode()}")
        servidor.sendto(b"Recibido!", direccion)
```

`"0.0.0.0"` significa "cualquier interfaz": el servidor acepta datagramas de cualquier cliente. El bucle infinito atiende a todos los que lleguen, uno tras otro, respondiendo con la dirección de cada uno. No es *broadcast* (eso exigiría `SO_BROADCAST` + envío a `255.255.255.255`), sino un servidor en todas las interfaces.

## 11. Compara TCP y UDP

```python
import socket, time
def test_tcp():
    t = time.time()
    for _ in range(10):
        with socket.socket() as s:
            s.connect(("127.0.0.1", 9000))
            s.send(b"x")
            s.recv(1024)
    return time.time() - t
def test_udp():
    t = time.time()
    for _ in range(10):
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.sendto(b"x", ("127.0.0.1", 9001))
            s.recvfrom(1024)
    return time.time() - t
print(f"TCP: {test_tcp():.3f}s")
print(f"UDP: {test_udp():.3f}s")
```

UDP suele ser más rápido porque no tiene handshake: cada intercambio TCP paga un `connect()` (three-way handshake) que UDP se ahorra.

> ⚠️ Necesitas un servidor **TCP en el 9000** y un servidor **UDP en el 9001** en marcha (p. ej. los de los ejercicios anteriores). Sin ellos, TCP lanza `ConnectionRefusedError` y UDP se queda esperando una respuesta que nadie envía.

## 12. Mini servidor web

```python
import socket
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 8080))
    srv.listen()
    conn, addr = srv.accept()
    with conn:
        conn.recv(1024)  # Leer petición (la ignoramos)
        respuesta = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Hola mundo</h1>"
        conn.sendall(respuesta.encode())
```

Abre http://127.0.0.1:8080 en tu navegador y verás "Hola mundo". El `SO_REUSEADDR` te permite relanzar el servidor sin esperar a que el puerto se libere.

---

📚 [Volver a la unidad](/ApuntesPSP/04-sockets-tcp-y-udp) · Por resolver: [💪 Boletín UD 5 — Avanzado](/ApuntesPSP/boletines/boletin-u04-avanzado)
