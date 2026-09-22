---
title: "09 — Cierre: consolida lo aprendido"
description: "Sé el socket, laboratorios TCP/UDP y el cierre de la unidad 🧠"
---

<p><small>Sé el socket, laboratorios TCP/UDP y el cierre de la unidad 🧠</small></p>

> 🗺️ **Estás en:** 🔌 **UD 5 · Sockets TCP y UDP** → 09 · Cierre

---

Has terminado la teoría: socket, cliente y servidor TCP, handshake, errores, `SO_REUSEADDR`, cliente y servidor UDP, datagramas, HTTP, NTP y cuándo usar cada protocolo. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio real con fallos intencionados y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesPSP/04-sockets-tcp-y-udp/08-practica-eco) y antes de abrir los boletines.

---

## ⭐ Sé el socket

> *Eres el socket del servidor, recién creado con `socket(AF_INET, SOCK_STREAM)`. Tu misión: escuchar, aceptar y atender a quien llame.*

**¿Qué pasa?**

1. Haces `bind(("127.0.0.1", 9000))`: reservas el puerto. **Ahora eres la centralita**.
2. Llamas a `listen()`: el SO ya sabe que esperas llamadas.
3. Te quedas en `accept()`... **esperas. Y esperas.** Eres bloqueante: no hay nada que hacer hasta que alguien llame.
4. Un cliente ejecuta `connect()` y el **three-way handshake** recorre la red (SYN → SYN+ACK → ACK). El timbre suena.
5. `accept()` despierta y devuelve `(conn, ("127.0.0.1", 54321))`: un **nuevo socket** para esa conversación, con la dirección del cliente.
6. Llegas a `recv(1024)`... **esperas otra vez**. Cuando el cliente manda `b"Hola!"`, despiertas.
7. Contestas con `sendall()` y, al salir del `with`, el socket de la conversación se cierra con la despedida FIN/ACK.
8. Y tú, el socket servidor, sigues en tu `accept()`: **esperando al siguiente cliente**.

**Todo el tiempo, el SO ha hecho el trabajo sucio: handshakes, despedidas, orden de bytes.**

> 💡 **Ahora tú:** ¿y si el cliente llama mientras sigues en el paso 6 atendiendo a otro? La conexión queda **en la cola** de `listen()` (el *backlog*), esperando tu próximo `accept()`. Eso es lo que viste en el [punto 3](/ApuntesPSP/04-sockets-tcp-y-udp/03-servidor-tcp): un solo hilo atiende a un cliente cada vez.

---

## 🔥 Fireside Chat: TCP vs UDP

> *Dos protocolos de transporte se sientan junto a la chimenea a dirimir, de una vez, quién manda.*

**TCP:** — Yo soy el mensajero certificado. Entrego cada carta, en orden, y si se pierde, la reenvío. Pero cuesta más.

**UDP:** — Yo soy el lanzador de aviones de papel. Mando y olvido. Si no llega, pues no llega. Pero lanzo 100 en el tiempo que tú preparas uno.

**TCP:** — Mis casos de uso: web (HTTP), correo (SMTP), transferencia de archivos (FTP). Todo lo que necesite fiabilidad.

**UDP:** — Mis casos de uso: videollamadas (Zoom), juegos online (Fortnite), DNS, NTP. Prefiero velocidad antes que fiabilidad.

**TCP:** — Tengo control de congestión, retransmisión, checksums...

**UDP:** — Yo tengo... velocidad. Y puedo añadir fiabilidad en la capa de aplicación si quiero (QUIC, por ejemplo).

**TCP:** — Eres un temerario.

**UDP:** — Y tú un pesado. Por eso nos complementamos.

> **Moraleja:** no son rivales: son dos herramientas para dos momentos. TCP cuando el dato debe quedar intacto; UDP cuando el momento es lo valioso. Ese criterio lo dominas desde el [punto 7](/ApuntesPSP/04-sockets-tcp-y-udp/07-cuando-usar-cada-protocolo).

---

## 🕵️ ¿Quién soy?

1. Soy el punto final de una conexión de red: la interfaz para enviar y recibir datos.
2. Soy el método del cliente TCP que estrecha la mano antes de hablar.
3. Soy el método del servidor UDP que recibe datagramas y dice de quién vienen.
4. Soy el estado que mantiene el puerto reservado unos segundos tras cerrar.
5. Soy la opción que evita el "Address already in use".
6. Soy el protocolo de texto sobre TCP que mueve la web.
7. Soy el grupo de servidores de tiempo que responde en el puerto 123.
8. Soy el protocolo fiable que se construye encima de UDP para HTTP/3.

<details>
<summary>🔄 Respuestas</summary>

1. **El socket**.
2. **`connect()`** — dispara el three-way handshake.
3. **`recvfrom()`** — devuelve `(datos, dirección)` del datagrama.
4. **TIME_WAIT**.
5. **`SO_REUSEADDR`**.
6. **HTTP**.
7. **`pool.ntp.org`** (NTP).
8. **QUIC**.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "conexión reiniciada y paquetes perdidos"

**CONRAD:** — "Clásico TCP: el cliente hace `recv()` y le salta *'ConnectionResetError'*. Pues claro. Razones: 1) **El servidor se cayó** en mitad de la conversación y su SO mandó un RST. 2) **Cerraste el servidor con Ctrl+C** mientras el cliente hablaba: misma historia. 3) El cliente intentó **escribir en un socket ya cerrado** → `BrokenPipeError`. 4) O el **timeout** se te pasó: `recv()` bloqueado para siempre porque nadie respondió."

**CONRAD:** — "Y lo mejor: *'pero yo hacía sendall y me daba error'*. ¡Pues claro! `sendall()` no avisa: es el SO quien lanza la excepción cuando la otra punta de la tubería ya no existe. Captura `ConnectionResetError` y `BrokenPipeError` por separado, como viste en el [punto 4](/ApuntesPSP/04-sockets-tcp-y-udp/04-ciclo-y-errores), y tu cliente dejará de morir a lo loco."

**CONRAD:** — "Y no me vengas con *'¿será que la red va lenta?'*. Si el servidor se reinició y volvió a arrancar, **sin `SO_REUSEADDR`** te salta *Address already in use* al instante. En UDP, encima, *'el cliente hacía recvfrom y nunca llegaba nada'*: si el datagrama se perdió, `recvfrom()` se queda bloqueado **para siempre**. Un `settimeout(5)` y verás la excepción aparecer. Tres errores, tres causas, tres soluciones: reintentos con `try/except`, `settimeout()`, y `SO_REUSEADDR`. A diagnosticar."

---

## ⚡ Laboratorio de tortura: eco TCP y UDP

> **Duración:** 45 minutos
> **Herramienta:** Python 3 (`socket`, sin instalar nada) + dos terminales

**Escenario:** construye los dos ecos del [punto 8](/ApuntesPSP/04-sockets-tcp-y-udp/08-practica-eco) — uno TCP, otro UDP — y rompe ambos a propósito.

**Tareas paso a paso:**

1. **Escribe el servidor eco TCP** (`servidor_eco.py`): `SO_REUSEADDR`, `bind()` en `127.0.0.1:9000`, `listen()`, `accept()` y un bucle que haga `recv()` y responda con `sendall(datos)`. Imprime cada mensaje con su dirección.
2. **Escribe el cliente TCP** (`cliente_eco.py`): pide un mensaje con `input()`, lo envía con `sendall()` y muestra la respuesta de `recv()`.
3. **Arranca el TCP** en una terminal y el cliente en otra. Envía tres mensajes y comprueba que el eco funciona y el contador lleva la cuenta.
4. **Repite en UDP** (puerto 9001): servidor con `bind()` + `recvfrom()` + `sendto(datos, direccion)`; cliente con `sendto()` + `recvfrom()`.
5. **Añade `settimeout(3)`** al cliente TCP y comprueba qué pasa si cierras el servidor antes de enviar. Haz lo mismo con el cliente UDP.

**Fallo intencionado TCP:** cierra el servidor con Ctrl+C y **relánzalo al instante**. ¿Qué pasa? Sin `SO_REUSEADDR`, el `bind()` falla con *"Address already in use"* porque las conexiones anteriores siguen en **TIME_WAIT**. Añade `servidor.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)` antes del `bind()` y comprueba que ahora sí puedes reiniciar sin esperar.

**Fallo intencionado UDP:** en el servidor, en lugar de responder con la `direccion` que devuelve `recvfrom()`, responde a una dirección inventada: `servidor.sendto(datos, ("127.0.0.1", 9999))`. ¿Qué pasa? El cliente se queda **bloqueado para siempre** en su `recvfrom()`: el eco fue a otro puerto, donde nadie escucha. Solo el `settimeout(5)` te sacará del atolladero.

> **Pista 1:** el estado TIME_WAIT es el culpable del fallo TCP. Con `SO_REUSEADDR` activado, el SO te deja reutilizar la dirección aunque queden conexiones en ese estado.
>
> **Pista 2:** si un cliente se queda colgado en `recv()` o `recvfrom()`, ese es el síntoma clásico de "la respuesta nunca llegó". Añade `settimeout()` y verás la excepción `socket.timeout` a los pocos segundos, confirmando el diagnóstico.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Telefonista** | Crear el primer socket TCP con `socket(AF_INET, SOCK_STREAM)` |
| 🏅 **Marca-Números** | Implementar un cliente TCP con `connect()`, `sendall()` y `recv()` |
| 🏅 **Centralita** | Implementar un servidor TCP con `bind()`, `listen()` y `accept()` |
| 🏅 **Handshaker** | Explicar el three-way handshake y el cierre FIN/ACK |
| 🏅 **Fénix TCP** | Dominar `SO_REUSEADDR` y reiniciar servidores sin error |
| 🏅 **Avión de Papel** | Crear y enviar el primer datagrama UDP con `sendto()` |
| 🏅 **Eco Master** | Montar un servidor + cliente eco en TCP y UDP |
| 🏅 **Fiable o Veloz** | Explicar cuándo usar TCP y cuándo UDP con casos reales |
| 🏅 **Navegador a pelo** | Hablar HTTP a mano con un socket TCP y leer la respuesta |
| 🏅 **Relojero** | Obtener la hora oficial de Internet con un cliente NTP |

---

## 🧠 Atrévete a pensar

1. ¿Por qué el servidor TCP hace `accept()` y no `recv()` directamente?
2. ¿Qué pasaría si dos programas intentan `bind()` al mismo puerto a la vez?
3. ¿Por qué UDP puede "perder datos" y TCP no, y por qué eso es aceptable en VoIP?
4. ¿Cómo sabe un servidor UDP a quién responder si no hay conexión?
5. ¿Por qué NTP usa UDP aunque la hora exacta parezca "importante"?

<details>
<summary>💡 Soluciones</summary>

1. Porque `accept()` **crea la conexión dedicada** para ese cliente (devuelve `conn` y su dirección). Hasta que no se acepta, no hay un canal del que leer. `recv()` se usa sobre esa `conn`, no sobre el socket servidor.
2. El segundo `bind()` lanzaría **`OSError: Address already in use`**: un puerto es de un solo proceso a la vez (salvo `SO_REUSEADDR` para TIME_WAIT). Es la protección del SO contra dos programas pisándose.
3. TCP **confirma y reenvía** cada segmento; UDP no. En VoIP, un frame perdido se salta y la conversación sigue; esperar a un reenvío la congelaría. Por eso se tolera la pérdida a cambio de fluidez.
4. Con la **dirección que entrega `recvfrom()`** (la tupla IP/puerto del cliente): cada datagrama llega con su origen pegado, y `sendto()` usa esa misma tupla para responder.
5. Porque **no depende de un solo paquete**: NTP manda muchas peticiones y calcula la hora estadísticamente. Si una se pierde, la siguiente vale igual: la fiabilidad sale del conjunto.
</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Método del cliente TCP que establece la conexión (7 letras)
4. Paquete que inicia el three-way handshake (3 letras)
6. Opción que evita "Address already in use" (12 letras)
8. Método del cliente UDP para enviar un datagrama (6 letras)

Vertical:
2. Verbo HTTP para pedir un recurso (3 letras)
3. Dirección de tu propia máquina (9 letras)
5. Estado que mantiene el puerto reservado al cerrar (9 letras)
7. Puerto de los servidores NTP (3 dígitos)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. CONNECT, 4. SYN, 6. SOREUSEADDR, 8. SENDTO
**Vertical:** 2. GET, 3. LOCALHOST, 5. TIMEWAIT, 7. 123

</details>

---

## 💬 Entrevista de trabajo

1. **"¿Qué diferencia hay entre TCP y UDP? ¿Cuándo usarías cada uno?"**
2. **"Escribe un servidor TCP que reciba un mensaje y lo devuelva."**
3. **"¿Cómo funciona el three-way handshake? Explícalo con un diagrama."**
4. **"¿Qué errores pueden ocurrir al comunicar por sockets y cómo los gestionas?"**
5. **"¿Qué es SO_REUSEADDR y cuándo lo necesitas?"**
6. **"¿Cómo funciona HTTP a nivel de socket? Descríbeme una petición y su respuesta."**

> 💡 **Cómo encararlas:** la 1 y la 2 son las "preguntas reina". Para la 1, repite la moraleja del [punto 7](/ApuntesPSP/04-sockets-tcp-y-udp/07-cuando-usar-cada-protocolo): fiabilidad contra velocidad, con los casos reales (web/correo → TCP; streaming/juegos/DNS → UDP). Para la 2, escribe el servidor del [punto 3](/ApuntesPSP/04-sockets-tcp-y-udp/03-servidor-tcp) sin pensarlo: `socket()` + `bind()` + `listen()` + `accept()` + `recv()` + `sendall()`. Si sabes contarlo fluido, ya eres medio desarrollador de redes.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Qué pasa si el servidor no llama a `listen()`?**

El cliente recibe `ConnectionRefusedError`. Sin `listen()`, no hay puerto abierto.

> ❓ **¿Y si no llamo a `bind()`?**

Para el servidor es obligatorio (necesita un puerto fijo). Para el cliente, el SO asigna uno automáticamente.

> ❓ **¿Puedo tener más de un cliente conectado a la vez?**

Con el código TCP básico, no: solo acepta un cliente cada vez. Para múltiples clientes, mira la **UD 6 · Servidores concurrentes**. En UDP, en cambio, un solo servidor atiende a cualquiera sin hilos: cada datagrama trae su dirección.

> ❓ **¿UDP puede perder datos?**

Sí. No hay confirmación de recepción. Si pierdes un paquete, se pierde para siempre.

> ❓ **¿HTTP siempre usa TCP?**

Sí, HTTP/1.1 y HTTP/2 usan TCP. **HTTP/3** usa QUIC, que va sobre UDP (¡la vuelta a la tortilla!).

> ❓ **¿NTP usa UDP? ¿No es importante que llegue la hora exacta?**

Sí, NTP usa UDP. Pero manda muchas peticiones y calcula estadísticamente la hora correcta. Si un paquete se pierde, no pasa nada: el próximo valdrá.

---

## 🎬 Poscréditos

> *Un socket TCP estrecha la mano. SYN, SYN+ACK, ACK. La llamada está en marcha.*

*El cliente habla; el servidor escucha; el eco vuelve exactamente igual que llegó.*

*El servidor se cae y renace. Esta vez, `SO_REUSEADDR` le deja volver al instante.*

*Y en una terminal lejana, un datagrama UDP vuela sin conexión, sin confirmación, sin miedo… mientras un reloj sin átomos pregunta la hora exacta en el puerto 123.*

**PRÓXIMAMENTE EN UD 6:** *Servidores concurrentes. Un cliente a la vez ya no basta: hilos, `select()` y `socketserver` para atender a una multitud sin caerte.*

---

## ✅ Criterios de evaluación cubiertos (RA3)

**RA3 — Sockets: comunicaciones en red con TCP/UDP y protocolos de aplicación (HTTP, NTP).**

| CE | Criterio | Cubierto |
|---|---|---|
| a) | Modelo de capas de red (TCP/IP) | ✅ Punto 1 + Fireside Chat |
| b) | Identifica tipos de sockets (TCP/UDP) | ✅ Puntos 1 y 5 |
| c) | Crea servidores TCP | ✅ Puntos 3 y 8 + ⚡ Laboratorio de tortura |
| d) | Crea clientes TCP | ✅ Puntos 2 y 8 + ⚡ Laboratorio de tortura |
| e) | Implementa servidores y clientes UDP | ✅ Puntos 5 y 8 + ⚡ Laboratorio de tortura |
| f) | Gestiona errores de red | ✅ Punto 4 + ⚡ Laboratorio con fallo intencionado |
| g) | Configura opciones de socket (SO_REUSEADDR, non-blocking) | ✅ Punto 4 + ⚡ Laboratorio de tortura |
| h) | Implementa protocolos de aplicación (HTTP, NTP) | ✅ Punto 6 + Cliente HTTP y NTP manuales |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/04-sockets-tcp-y-udp) · **Anterior:** [08 · Práctica eco](/ApuntesPSP/04-sockets-tcp-y-udp/08-practica-eco) · **Siguiente:** **[UD 6 · Servidores concurrentes](/ApuntesPSP/05-servidores-concurrentes)**
