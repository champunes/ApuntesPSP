---
title: "09 — Cierre: consolida lo aprendido"
description: Sé el código, el ring final y el laboratorio de la unidad 🧠
---

<p><small>Sé el código, el ring final y el laboratorio de la unidad 🧠</small></p>

> 🗺️ **Estás en:** 🐍 **U01 · Python 3 básico** → 09 · Cierre

---

Has recorrido los 8 puntos de Python básico: comentarios, tipos, colecciones, control de flujo, funciones, clases, módulos y las herramientas avanzadas. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio real con fallos intencionados y las preguntas que te harían en una entrevista. Léelo justo después del [punto 8](/ApuntesPSP/00-python-basico/08-modulos-y-avanzado) y antes de abrir los boletines.

---

## ⭐ Sé el código

> *Eres un programa de Python. Tu misión: procesar una lista de alumnos y calcular su nota media.*

**Paso a paso, ¿qué ocurre?**

1. **Importas `math`** con `import math`. El módulo se carga en memoria y puedes usar `math.sqrt()` si lo necesitas.
2. **Defines una función `calcular_media`** con `def calcular_media(notas):`. El argumento `notas` es una lista.
3. **Dentro de la función**, usas `sum(notas) / len(notas)` para calcular la media. `sum()` y `len()` son built-ins, no necesitan import.
4. **Llamas a la función** con `calcular_media([7, 8, 9])`. Python crea un frame nuevo en la pila de llamadas, ejecuta el bloque indentado y devuelve `8.0`.
5. **Guardas el resultado** en una variable: `media = calcular_media(notas)`.
6. **Usas un `if`** para comprobar si la media es >= 5: aprobado o suspensa.
7. **Imprimes** el resultado con un f-string.

> 💡 **Ahora tú:** ¿y si la lista de notas está vacía? `len(notas)` sería 0 y dividirías entre cero. Necesitarías un `try/except` o una comprobación previa. Eso es programación defensiva.

---

## 🔥 Fireside Chat: Variables vs Constantes

> *Dos conceptos se sientan junto a la chimenea a zanjar la eterna pregunta de si Python tiene constantes.*

**Variable:** — Soy la base de todo. `x = 5`, `nombre = "Ana"`. Cualquier cosa que cambie durante la ejecución pasa por mí.

**Constante:** — Y yo… bueno, en Python no existo oficialmente. No hay palabra clave `const`. Pero la convención es que me escriba en MAYÚSCULAS: `MAX_INTENTOS = 3`.

**Variable:** — Entonces eres solo una convención. Cualquiera puede hacer `MAX_INTENTOS = 5` y romper tu "constancia".

**Constante:** — Es cierto. En Python confiamos en el programador. Si pongo `PI = 3.14159` en mayúsculas, es un aviso de que no toque. Pero no me protege el lenguaje.

**Variable:** — En JavaScript sí tienes `const`. En Python, la filosofía es "somos adultos".

**Constante:** — Y funciona. La claridad del código importa más que la imposición.

**Moraleja:** En Python, las constantes son convención, no restricción. Escribe en MAYÚSCULAS lo que no deba cambiar y confía en que quien lea tu código lo respete.

---

## 🕵️ ¿Quién soy?

Adivina el concepto Python de cada pista:

1. "Soy un bloque de código que se repite mientras una condición sea verdadera. Puedo ser infinito si no tengo cuidado."
2. "Soy una función sin nombre, escrita en una sola línea con `lambda`."
3. "Soy la referencia al objeto dentro de sus propios métodos. Sin mí, las clases no funcionarían."
4. "Soy una colección que no admite duplicados y puedo hacer intersecciones y uniones."
5. "Soy un valor que representa la ausencia de datos. No soy `0`, no soy `""`, soy `None`."
6. "Soy un archivo `.py` que otros programas importan. No se ejecuta directamente, pero mi código se reutiliza."

<details>
<summary>🔄 Respuestas</summary>

1. Un **bucle `while`**.
2. Una **función lambda**.
3. **`self`**.
4. Un **conjunto (set)**.
5. **`None`**.
6. Un **módulo**.

</details>

---

## 🤬 CONRAD VS EL MUNDO

> *Conrad, el profesor gruñón que odia los errores clásicos, enumera los fallos que ve cada semestre.*

**1. "Olvídate del `:`"**

```python
if x > 5   # SyntaxError: invalid syntax
```

El `:` al final de `if`, `for`, `while`, `def` y `class` es **obligatorio**. Sin él, Python no sabe dónde empieza el bloque.

**2. "Mezclar espacios y tabuladores"**

```python
def func():
    x = 5
	y = 10   # TabError: inconsistent use of tabs and spaces
```

Python odia mezclar. Usa **4 espacios** siempre. Configura tu editor para que al pulsar Tab inserte 4 espacios.

**3. "Ponerle comas al return"**

```python
def sumar(a, b):
    return a, b   # ¡Esto devuelve una TUPLA! (a, b)
```

Si quieres devolver dos valores separados, usa `return a, b` (tupla). Si quieres devolver la suma, es `return a + b`.

**4. "Confundir `=` con `==`"**

```python
x = 5      # Asignación
x == 5     # Comparación (devuelve True o False)
```

**5. "Olvidar `self` en los métodos"**

```python
class MiClase:
    def saludar():
        print("Hola")   # TypeError: saludar() takes 0 positional arguments but 1 was given
```

Todo método de instancia necesita `self` como primer parámetro, aunque no lo uses.

---

## ⚡ Laboratorio de tortura

> **Duración:** 20 minutos
> **Herramienta:** cualquier editor de texto + terminal
> **Objetivo:** crear un programa completo que gestione una lista de tareas (to-do list) usando lo aprendido.

### Escenario

Eres el desarrollador de una app de tareas. El usuario debe poder añadir tareas, marcarlas como hechas, ver la lista y calcular el porcentaje de tareas completadas.

### Tareas paso a paso

1. Crea una lista vacía `tareas = []`.
2. Crea una función `agregar_tarea(nombre, prioridad)` que añada un diccionario `{"nombre": nombre, "prioridad": prioridad, "hecha": False}`.
3. Crea una función `completar_tarea(nombre)` que busque la tarea por nombre y cambie `hecha` a `True`. Si no la encuentra, imprime un aviso.
4. Crea una función `ver_tareas()` que imprima cada tarea con su estado (✅ si está hecha, ⬜ si no).
5. Crea una función `calcular_progreso()` que devuelva el porcentaje de tareas completadas.
6. Añade un menú con `while True` y `input()` que permita al usuario elegir entre: agregar, completar, ver, progreso y salir.

### Fallo intencionado

El siguiente código tiene **3 errores**. Encuéntralos:

```python
tareas = []

def agregar_tarea(nombre, prioridad):
    tarea = {"nombre": nombre, "prioridad": prioridad, "hecha": False}
    tareas.append(tarea)

def completar_tarea(nombre):
    for tarea in tareas:
        if tarea["nombre"] == nombre:
            tarea["hecha"] = True
            return
    print("Tarea no encontrada")

def ver_tareas():
    for i, tarea in enumerate(tareas):
        estado = "✅" if tarea["hecha"] else "⬜"
        print(f"{i+1}. {estado} {tarea['nombre']} (Prioridad: {tarea['prioridad']})")

def calcular_progreso():
    if len(tareas) == 0:
        return 0
    hechas = sum(1 for t in tareas if t["hecha"])
    return hechas / len(tareas) * 100

while True:
    print("\n1. Agregar tarea")
    print("2. Completar tarea")
    print("3. Ver tareas")
    print("4. Progreso")
    print("5. Salir")
    opcion = input("Elige una opción: ")

    if opcion == "1":
        nombre = input("Nombre de la tarea: ")
        prioridad = input("Prioridad (alta/media/baja): ")
        agregar_tarea(nombre, prioridad)
    elif opcion == "2":
        nombre = input("Nombre de la tarea a completar: ")
        completar_tarea(nombre)
    elif opcion == "3":
        ver_tareas()
    elif opcion == "4":
        print(f"Progreso: {calcular_progreso():.1f}%")
    elif opcion == "5":
        break
```

**Pista 1:** si el usuario escribe un nombre que no existe, el programa no dice nada. Añade un aviso cuando la tarea no se encuentre (pero ten en cuenta que el `return` dentro del `for` hace que salga de la función al encontrar la primera coincidencia).

**Pista 2:** si el usuario introduce algo que no es un número (por ejemplo, una letra), `ver_tareas` no maneja el error. ¿Qué excepción se lanza?

**Pista 3:** la función `calcular_progreso` devuelve un float con un decimal. ¿Y si el usuario escribe una opción que no existe en el menú? No hay comprobación.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🐣 **Primera ejecución** | Ejecuta `python hola.py` sin errores |
| 🎯 **Cien por cien** | Resuelve todos los ejercicios del boletín inicial |
| 🔥 **Modo avión** | Resuelve todos los ejercicios del boletín avanzado |
| 🧠 **El interview** | Responde todas las preguntas de "Entrevista de trabajo" sin mirar los apuntes |

---

## 🧠 Atrévete a pensar

1. ¿Por qué Python es mejor para principiantes que C o Java?
2. ¿Cuándo usarías una tupla en lugar de una lista?
3. ¿Qué pasaría si `range(5)` devolviera una lista en lugar de un generador?
4. ¿Cómo harías un programa que lea un archivo de texto y cuente cuántas veces aparece cada palabra?
5. ¿Por qué se usa `self` en lugar de poner el nombre de la clase directamente?

<details>
<summary>💡 Soluciones</summary>

1. Python tiene sintaxis limpia, tipado dinámico y no necesita compilar. Permite concentrarse en la lógica, no en la sintaxis.
2. Cuando los datos **no deben cambiar**: coordenadas `(x, y)`, configuraciones `(ancho, alto)`, registros de base de datos. Las tuplas son más rápidas y seguras.
3. Ocuparía mucha más memoria. Un generador produce valores uno a uno; una lista los guarda todos en memoria a la vez.
4. Usarías `open()` para leer el archivo, `.split()` para separar palabras, un diccionario para contar ocurrencias y un bucle `for` para recorrer las palabras.
5. Porque `self` permite que una clase **herede** de otra sin cambiar los nombres. Si usaras `Humano` directamente, las clases hijas no funcionarían bien.

</details>

---

## 🧩 Crucigrama de bits

Resuelve las pistas y rellena las casillas:

```
        1 ──────── 2 ──────── 3 ──────── 4
        │           │           │           │
        5           6           7           │
        │           │           │           │
        8 ──────── 9 ──────── 10 ──────── 11
        │           │           │           │
       12           │          13           │
        │           │           │           │
       14 ──────── 15 ──────── 16 ──────── 17
```

**Horizontales:**
1. (5 letras) Colección mutables con índices numéricos
5. (3 letras) Referencia al objeto dentro de sus métodos
8. (6 letras) Bloque que se repite mientras la condición sea verdadera
12. (4 letras) Sinónimo de función anónima (empieza con "l")
14. (7 letras) Colección de pares clave-valor

**Verticales:**
1. (3 letras) Valor que representa "nada": _ _ _
2. (6 letras) Archivo `.py` que se importa
3. (4 letras) Número con decimales (tipo de dato)
4. (8 letras) Palabra clave para crear una función
6. (7 letras) Añade paquetes desde PyPI
7. (4 letras) Término técnico para "duplicar" un string
9. (5 letras) Sinónimo de conjunto (en inglés)
10. (6 letras) Colección inmutable
11. (4 letras) Resultado de `True`
13. (8 letras) Archivo de dependencias del proyecto
15. (6 letras) Valor que puede ser `True` o `False`
16. (3 letras) Palabra clave para importar módulos
17. (4 letras) Función built-in que suma una lista

<details>
<summary>🔄 Soluciones</summary>

**Horizontales:** 1. LISTA, 5. SELF, 8. WHILE, 12. LAMBDA, 14. DICCIONARIO
**Verticales:** 1. NONE, 2. MODULO, 3. FLOAT, 4. DEFINIR, 6. PIP, 7. UPPER, 9. SET, 10. TUPLA, 11. TRUE, 13. REQUIREMENTS, 15. BOOLEAN, 16. IMPORT, 17. SUM

</details>

---

## 💬 Entrevista de trabajo

Estas son preguntas típicas sobre Python básico que podrían hacerte en una entrevista:

1. **¿Cuál es la diferencia entre una lista y una tupla?**
   > La lista es mutable (puedes cambiarla); la tupla es inmutable (no cambia). Las tuplas son más rápidas y seguran para datos que no deben modificar.

2. **¿Qué es `self` en una clase?**
   > Es la referencia al objeto actual. Permite acceder a los atributos y métodos del propio objeto dentro de la clase.

3. **¿Cuándo usarías `*args` y `*kwargs`?**
   > Cuando no sabes cuántos argumentos recibirá la función. `*args` para posicionales, `**kwargs` para nombrados.

4. **¿Qué es un generador?**
   > Una función con `yield` que produce valores uno a uno, sin crear toda la secuencia en memoria. Es eficiente para datos grandes.

5. **¿Qué hace un decorador?**
   > Envuelve una función para añadirle comportamiento antes y después de ejecutarla, sin modificar su código original.

6. **¿Cuál es la diferencia entre `==` e `is`?**
   > `==` compara **valores** (igualdad). `is` compara **identidad de objeto** (si son el mismo objeto en memoria).

---

## 🤷 No hay preguntas tontas

1. **¿Python es lento?** Es más lento que C o Java, pero para la mayoría de aplicaciones la diferencia es irrelevante. Y si necesitas velocidad, usas C extensions o PyPy.

2. **¿Por qué Python 3 y no Python 2?** Python 2 ya no recibe soporte desde 2020. Python 3 es el presente y el futuro.

3. **¿Necesito memorizar todas las funciones built-in?** No. Conoce las principales (`len`, `range`, `print`, `input`, `sum`, `max`, `min`, `sorted`) y busca el resto en la documentación.

4. **¿Cuál es la diferencia entre `print()` y `return`?** `print()` muestra algo por pantalla (para el usuario). `return` devuelve un valor (para que otro código lo use).

5. **¿Para qué sirve `if __name__ == "__main__":`?** Permite que un archivo `.py` se ejecute directamente **o** importarse como módulo sin ejecutar el código principal.

---

## 🎬 Poscréditos

> *La cámara se aleja del terminal. La última línea de código se ejecuta. El cursor parpadea en la esquina de la pantalla, esperando la siguiente instrucción.*
>
> *Has aprendido a hablar en Python. Ahora viene lo bueno: crear procesos que vivan y mueran, hilos que se sincronicen, servidores que atiendan peticiones de medio mundo.*
>
> *El viaje apenas empieza.*

**PRÓXIMAMENTE EN U02 — Procesos y Subprocess**

---

## ✅ Criterios de evaluación cubiertos (Prerequisito)

| CE | Criterio | Cubierto |
|---|---|---|
| — | Domina la sintaxis básica de Python (variables, tipos, operadores) | ✅ Puntos 3 y 4 |
| — | Controla el flujo de ejecución (condicionales, bucles, excepciones) | ✅ Punto 5 |
| — | Define y llama a funciones con diferentes tipos de argumentos | ✅ Punto 6 |
| — | Crea y usa clases con atributos y métodos | ✅ Punto 7 |
| — | Importa módulos y gestiona paquetes externos | ✅ Punto 8 |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/00-python-basico) · **Anterior:** [08 · Módulos y avanzado](/ApuntesPSP/00-python-basico/08-modulos-y-avanzado) · **Siguiente:** **[U02 · Procesos y Subprocess](/ApuntesPSP/01-gestion-de-procesos)**
