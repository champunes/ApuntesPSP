---
title: 01 — Introducción a Python
description: Qué es Python, por qué aprenderlo y cómo empezar 🐍
---

<p><small>Qué es Python, por qué aprenderlo y cómo empezar 🐍</small></p>

> 🗺️ **Estás en:** 🐍 **U00 · Python 3 básico** → 01 · Introducción a Python

---

## 📬 La idea en una frase

> Python es un lenguaje interpretado, de tipado dinámico y sintaxis limpia, diseñado para que programas se lean como pseudocódigo. Es la puerta de entrada ideal a la programación y el lenguaje que usaremos en todo el módulo PSP.

¿Por qué Python y no otro lenguaje? Porque en pocas líneas consigues mucho resultado, la comunidad es enorme y la documentación, excelente. Además, es el lenguaje más usado en servidores, automatización y ciencia de datos. Si aprendes bien Python, no solo apruebas este módulo: abres puertas a medio mundo.

---

## 🐍 ¿Qué es Python?

Python es un lenguaje de programación de **alto nivel**, **interpretado** y **multiplataforma**. Creado por Guido van Rossum en 1991, hoy es uno de los lenguajes más populares del mundo.

Algunas características clave:

| Característica | Qué significa en la práctica |
|---|---|
| **Interpretado** | No necesitas compilar. Escribes el código y lo ejecutas directamente. |
| **Tipado dinámico** | No declares tipos: `x = 5` y luego `x = "hola"` funciona sin problemas. |
| **Sintaxis limpia** | El código se lee casi como inglés. Las indentaciones obligatorias fuerzan código limpio. |
| **Multiplataforma** | Funciona en Windows, Linux y macOS sin cambiar nada. |
| **Biblioteca estándar enorme** | `os`, `sys`, `threading`, `socket`, `json`… todo incluido. |
| **Comunidad masiva** | Casi cualquier duda que tengas, ya alguien la respondió en Stack Overflow. |

---

## 🤔 ¿Por qué Python para PSP?

En este módulo vamos a crear procesos, hilos, servidores, clientes y APIs. Todo eso se hace con Python porque:

- **`subprocess`** y **`threading`** están en la biblioteca estándar: no necesitas instalar nada.
- **`socket`** permite crear servidores TCP y UDP en pocas líneas.
- **`requests`** y **`httpx`** hacen peticiones HTTP fáciles.
- **`asyncio`** permite programación asíncrona para servidores concurrentes.
- La sintaxis clara reduce errores cuando estás aprendiendo conceptos nuevos.

---

## 🖥️ Instalar Python

### Windows

1. Ve a [python.org/downloads](https://www.python.org/downloads/).
2. Descarga la última versión (3.10 o superior).
3. **Importante:** al instalar, marca la casilla **"Add Python to PATH"**.
4. Abre una terminal y verifica:

```bash
python --version
```

Deberías ver algo como `Python 3.11.5`.

### Linux (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install python3 python3-pip
python3 --version
```

### macOS

```bash
brew install python3
python3 --version
```

---

## 💻 Tu primer programa

Abre un editor de texto (VS Code, PyCharm o incluso el Bloc de notas) y escribe:

```python
print("¡Hola, mundo!")
```

Guarda como `hola.py` y ejecuta en la terminal:

```bash
python hola.py
```

Salida:

```
¡Hola, mundo!
```

**¿Ha funcionado?** Enhorabuena: ya tienes Python instalado y sabes ejecutar un programa.

---

## 🧪 La consola interactiva

Python ofrece una consola interactiva donde puedes probar código línea a línea. Abre una terminal y escribe:

```bash
python
```

Verás el prompt `>>>`. Ahí puedes escribir expresiones y ver el resultado al instante:

```python
>>> 2 + 3
5
>>> "hola".upper()
'HOLA'
>>> exit()
```

La consola interactiva es perfecta para probar cosas rápido antes de meterlas en un archivo.

---

## 🧠 Mini-chequeo

1. ¿Qué pasa si no marcas "Add Python to PATH" al instalar en Windows?
2. ¿Cuál es la diferencia entre el archivo `.py` y la consola interactiva?
3. ¿Python necesita compilar los programas antes de ejecutarlos?

<details>
<summary>🔄 Respuestas</summary>

1. La terminal no reconoce el comando `python`. Tendrías que usar la ruta completa o añadirlo manualmente al PATH.
2. El archivo `.py` es un programa guardado que puedes reejecutar cuantas veces quieras. La consola interactiva es para probar código suelto sin guardar.
3. No. Python es interpretado: las instrucciones se traducen y ejecutan una a una, sin generar un archivo binario intermedio.

</details>

---

## ✅ Resumen en 3 frases

- Python es un lenguaje interpretado, de tipado dinámico y sintaxis limpia, ideal para empezar.
- Para instalarlo, ve a python.org (Windows) o usa el gestor de paquetes (Linux/macOS) y verifica con `python --version`.
- Tu primer programa es un `print("¡Hola, mundo!")`: guárdalo en un `.py` y ejecútalo con `python hola.py`.

---

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| **Interpretado** | Se ejecuta línea a línea, sin compilar a binario |
| **Tipado dinámico** | Las variables no tienen tipo fijo; puede cambiar en cualquier momento |
| **Alto nivel** | Se acerca al lenguaje humano; el intérprete se encarga de la máquina |
| **PATH** | Variable del sistema que dice dónde buscar ejecutables |
| **Consola interactiva** | Modo de Python para probar código línea a línea |
| **Módulo** | Archivo `.py` con funciones y clases reutilizables |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/00-python-basico) · **Siguiente:** [02 · Comentarios](/ApuntesPSP/00-python-basico/02-comentarios)
