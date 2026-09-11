---
title: 02 — Comentarios
description: Comentarios de línea y docstrings multilinea 📝
---

<p><small>Comentarios de línea y docstrings multilinea 📝</small></p>

> 🗺️ **Estás en:** 🐍 **U00 · Python 3 básico** → 02 · Comentarios

---

## 📬 La idea en una frase

> Los comentarios explican el código a quien lo lea (incluido tú dentro de tres meses). En Python se escriben con `#` para una línea y con `"""` para bloques multilinea.

Un comentario es texto que Python **ignora por completo** al ejecutar. Sirve para documentar, explicar la lógica o dejar notas. Es la diferencia entre código que funciona y código que funciona **y se entiende**.

---

## 📝 Comentario de línea

El comentario de línea se escribe con el carácter `#`. Todo lo que haya a la derecha de `#` en esa línea se ignora:

```python
# Este es un comentario completo
x = 5  # Este comentario va al final de la línea de código
```

Buena práctica: separa el comentario del código con al menos un espacio:

```python
# Bien
x = 5  # valor inicial

# Mal
x = 5  #valor inicial
```

### Cuándo usar comentarios

- Para explicar **por qué** haces algo, no **qué** hace el código (eso se lee solo).
- Para dejar una nota temporal: `# TODO: mejorar esto más adelante`.
- Para bloquear código que no quieres ejecutar de momento:

```python
# print("Esta línea no se ejecuta")
x = 10
```

---

## 📄 Docstring (comentario multilinea)

Para comentarios de varias líneas se usan **tres comillas dobles** `"""`. Esto se llama **docstring** y se usa especialmente para documentar funciones, clases y módulos:

```python
"""
Este es un comentario multilinea.
Puede ocupar las líneas que necesites.
Python lo ignora completamente.
"""
```

### Docstrings en funciones

Cuando pones un docstring como **primera instrucción** de una función, se convierte en su documentación oficial:

```python
def sumar(a, b):
    """
    Suma dos números y devuelve el resultado.

    Parámetros:
        a (int o float): primer número
        b (int o float): segundo número

    Retorna:
        int o float: la suma de a y b
    """
    return a + b
```

Puedes acceder a ese docstring con `help()` o con `sumar.__doc__`:

```python
help(sumar)
# Salida: Suma dos números y devuelve el resultado...
```

### Docstrings en clases

Lo mismo aplica a las clases:

```python
class Persona:
    """
    Representa una persona con nombre y edad.

    Atributos:
        nombre (str): nombre de la persona
        edad (int): edad en años
    """

    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
```

---

## 🔄 Comillas simples vs dobles

Python acepta comillas simples `'` y dobles `"` para strings. Para docstrings se usan `"""` (tres comillas dobles) por convención, aunque `'''` (tres comillas simples) también funciona:

```python
# Todos son strings válidos
'Hola'
"Hola"
'''Hola'''
"""Hola"""
```

La convención del PEP 257 (guía de estilo de Python) recomienda `"""` para docstrings.

---

## ⚠️ Errores comunes

### Olvidar la segunda comilla

```python
# Error de sintaxis
"Hola mundo
# Falta la comilla de cierre
```

### Comentario sin espacio tras #

```python
# Funciona pero es feo
x = 5  #esto funciona
x = 5  # esto es mejor
```

### Confundir string con docstring

```python
# Esto es un string asignado a una variable, no un docstring
mensaje = """
Esto es un string multilinea.
No documenta nada.
"""

# Esto SÍ es un docstring (primera instrucción de la función)
def saludar():
    """
    Saluda al usuario.
    """
    print("Hola")
```

---

## 🧠 Mini-chequeo

1. ¿Qué personaje se usa para comentarios de una línea en Python?
2. ¿Cómo se escribe un docstring de varias líneas?
3. ¿Un docstring es obligatorio en una función?

<details>
<summary>🔄 Respuestas</summary>

1. La almohadilla o numeral: `#`.
2. Con tres comillas dobles `"""` al inicio y al final del bloque de texto.
3. No es obligatorio, pero es muy recomendable. Facilita el mantenimiento y permite usar `help()` para ver la documentación.

</details>

---

## ✅ Resumen en 3 frases

- Los comentarios de línea usan `#` y se ignoran al ejecutar.
- Los docstrings usan `"""` y documentan funciones, clases y módulos.
- Comenta el **por qué**, no el **qué**: el código debe ser autoexplicativo.

---

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| **Comentario** | Texto ignorado por Python que explica el código |
| **Docstring** | Comentario multilinea con `"""` que documenta funciones/clases |
| **PEP 257** | Convención de Python para escribir docstrings |
| **Autoexplicativo** | Código que se entiende solo por su nombre y estructura |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/00-python-basico) · **Anterior:** [01 · Introducción a Python](/ApuntesPSP/00-python-basico/01-introduccion) · **Siguiente:** [03 · Tipos de datos y operadores](/ApuntesPSP/00-python-basico/03-tipos-de-datos)
