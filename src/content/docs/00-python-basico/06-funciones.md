---
title: 06 — Funciones
description: def, argumentos, lambda, map, filter y comprensiones ⚡
---

<p><small>def, argumentos, lambda, map, filter y comprensiones ⚡</small></p>

> 🗺️ **Estás en:** 🐍 **U01 · Python 3 básico** → 06 · Funciones

---

## 📬 La idea en una frase

> Una función es un bloque de código reutilizable que hace una sola cosa. Se define con `def`, se llama con paréntesis y puede recibir argumentos y devolver valores.

Las funciones son el primer paso hacia el código **modular**: escribes una vez, usas cuantas veces quieras. Sin funciones, cada programa sería un monolito imposible de mantener.

---

## 🔨 Definir y llamar funciones

```python
def sumar(x, y):
    print(f"x es {x} y y es {y}")
    return x + y

# Llamada con argumentos posicionales
sumar(5, 6)   # imprime "x es 5 y y es 6", devuelve 11

# Llamada con argumentos de palabra clave (el orden no importa)
sumar(y=6, x=5)   # => 11
```

### Reglas clave

- `def` seguido del nombre, paréntesis y dos puntos.
- El bloque de la función va indentado.
- `return` devuelve un valor. Sin `return`, la función devuelve `None`.

---

## 📦 Argumentos variables

### *args

Recoge un número **variable** de argumentos posicionales en una tupla:

```python
def varargs(*args):
    return args

varargs(1, 2, 3)   # => (1, 2, 3)
```

### **kwargs

Recoge un número **variable** de argumentos de palabra clave en un diccionario:

```python
def keyword_args(**kwargs):
    return kwargs

keyword_args(pie="grande", lago="ness")   # => {"pie": "grande", "lago": "ness"}
```

### Combinar ambos

```python
def todos_los_argumentos(*args, **kwargs):
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

todos_los_argumentos(1, 2, a=3, b=4)
# Args: (1, 2)
# Kwargs: {'a': 3, 'b': 4}
```

### Desempaquetar al llamar

```python
args = (1, 2, 3, 4)
kwargs = {"a": 3, "b": 4}

todos_los_argumentos(*args)          # equivalente a todos_los_argumentos(1, 2, 3, 4)
todos_los_argumentos(**kwargs)       # equivalente a todos_los_argumentos(a=3, b=4)
todos_los_argumentos(*args, **kwargs)
```

---

## 🏭 Funciones de primera clase

En Python, las funciones son objetos. Puedes pasarlas como argumentos, devolverlas y guardarlas en variables:

```python
def crear_suma(x):
    def suma(y):
        return x + y
    return suma

sumar_10 = crear_suma(10)
sumar_10(3)   # => 13
```

Esto se llama **clausura**: la función `suma` "recuerda" el valor de `x` aunque `crear_suma` ya ha terminado.

---

## 🔹 Funciones lambda

Una función lambda es una función **anónima** (sin nombre) de una sola expresión:

```python
# lambda argumentos: expresión
(lambda x: x > 2)(3)   # => True
```

Son útiles para argumentos de otras funciones:

```python
# Funciones de orden superior
map(sumar_10, [1, 2, 3])               # => [11, 12, 13]
filter(lambda x: x > 5, [3, 4, 5, 6, 7])  # => [6, 7]
```

---

## 🔄 map, filter y reduce

### map

Aplica una función a cada elemento de un iterable:

```python
numeros = [1, 2, 3, 4]
cuadrados = list(map(lambda x: x ** 2, numeros))
# => [1, 4, 9, 16]
```

### filter

Filtra elementos según una condición:

```python
numeros = [1, 2, 3, 4, 5, 6]
pares = list(filter(lambda x: x % 2 == 0, numeros))
# => [2, 4, 6]
```

### reduce

Acumula los elementos de un iterable en un solo valor (necesita importar `functools`):

```python
from functools import reduce

numeros = [1, 2, 3, 4]
suma_total = reduce(lambda a, b: a + b, numeros)
# => 10
```

---

## 🧩 Comprensiones

Las comprensiones son la forma **pythonica** de crear listas, diccionarios y conjuntos a partir de iterables:

### Comprensión de lista

```python
# Bucle clásico
cuadrados = []
for x in range(5):
    cuadrados.append(x ** 2)

# Comprensión de lista (lo mismo en una línea)
cuadrados = [x ** 2 for x in range(5)]   # => [0, 1, 4, 9, 16]
```

### Con condición

```python
pares = [x for x in range(10) if x % 2 == 0]   # => [0, 2, 4, 6, 8]
```

### Comprensión de diccionario

```python
cuadrados_dict = {k: k ** 2 for k in range(3)}   # => {0: 0, 1: 1, 2: 4}
```

### Comprensión de conjunto

```python
letras = {c for c in "la cadena"}   # => {'d', 'l', 'a', 'n', ' ', 'c', 'e'}
```

---

## 🧠 Mini-chequeo

1. ¿Cuál es la diferencia entre `*args` y `**kwargs`?
2. ¿Qué devuelve `map(lambda x: x * 2, [1, 2, 3])` sin envolver en `list()`?
3. ¿Cómo se escribe una comprensión de lista que filtre solo los números impares del 1 al 10?

<details>
<summary>🔄 Respuestas</summary>

1. `*args` recoge argumentos posicionales en una **tupla**. `**kwargs` recoge argumentos de palabra clave en un **diccionario**.
2. Un objeto `map` (un iterable perezoso). Para ver los valores, necesitas `list()`.
3. `[x for x in range(1, 11) if x % 2 != 0]` → `[1, 3, 5, 7, 9]`.

</details>

---

## ✅ Resumen en 3 frases

- Se define con `def`, se llama con paréntesis y se devuelve valor con `return`.
- `*args` y `**kwargs` permiten argumentos variables; las lambda son funciones anónimas de una expresión.
- Las comprensiones crean listas, diccionarios y conjuntos de forma concisa y legible.

---

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| **def** | Palabra clave para definir una función |
| **return** | Devuelve un valor desde la función |
| **args** | Argumentos posicionales variables (tupla) |
| **kwargs** | Argumentos de palabra clave variables (diccionario) |
| **Lambda** | Función anónima de una sola expresión |
| **Cláusura** | Función que recuerda variables de su contexto |
| **Comprensión** | Sintaxis concisa para crear colecciones |
| **map** | Aplica una función a cada elemento |
| **filter** | Filtra elementos según una condición |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/00-python-basico) · **Anterior:** [05 · Control de flujo](/ApuntesPSP/00-python-basico/05-control-de-flujo) · **Siguiente:** [07 · Clases](/ApuntesPSP/00-python-basico/07-clases)
