---
title: 05 — Control de flujo
description: if, for, while, range, try/except e iteradores 🔀
---

<p><small>if, for, while, range, try/except e iteradores 🔀</small></p>

> 🗺️ **Estás en:** 🐍 **U01 · Python 3 básico** → 05 · Control de flujo

---

## 📬 La idea en una frase

> El control de flujo decide **qué código se ejecuta y cuándo**. Las tres estructuras básicas son la condición (`if`), la iteración (`for` y `while`) y el manejo de errores (`try/except`).

Sin control de flujo, todo programa sería una lista lineal de instrucciones. Con él, tu programa puede tomar decisiones, repetir tareas y sobrevivir a los errores.

---

## 🔀 Condicional: if / elif / else

```python
una_variable = 5

if una_variable > 10:
    print("Es mayor que 10")
elif una_variable < 10:    # elif es opcional
    print("Es menor que 10")
else:                       # else también es opcional
    print("Es exactamente 10")
```

### Reglas clave

- **La indentación es obligatoria.** Python usa sangría (4 espacios por convención) para saber qué código pertenece a cada bloque.
- `elif` y `else` son opcionales.
- Puedes encadenar cuantos `elif` quieras:

```python
nota = 7

if nota >= 9:
    print("Sobresaliente")
elif nota >= 7:
    print("Notable")
elif nota >= 5:
    print("Aprobado")
else:
    print("Suspenso")
```

---

## 🔄 Bucle: for

`for` itera sobre cualquier **iterable**: listas, tuplas, strings, diccionarios, rangos…

```python
for animal in ["perro", "gato", "ratón"]:
    print(f"{animal} es un mamífero")
```

Salida:

```
perro es un mamífero
gato es un mamífero
ratón es un mamífero
```

### La función range

`range(n)` genera una secuencia de números del 0 al n-1:

```python
for i in range(4):
    print(i)
```

Salida:

```
0
1
2
3
```

`range` acepta hasta 3 argumentos: `range(inicio, final, pasos)`:

```python
range(0, 10, 2)   # => 0, 2, 4, 6, 8
range(5, 0, -1)   # => 5, 4, 3, 2, 1
```

### Iterar con índice

Si necesitas el índice y el valor, usa `enumerate()`:

```python
frutas = ["manzana", "plátano", "cereza"]

for i, fruta in enumerate(frutas):
    print(f"{i}: {fruta}")
```

Salida:

```
0: manzana
1: plátano
2: cereza
```

---

## 🔁 Bucle: while

`while` itera mientras una condición sea `True`:

```python
x = 0
while x < 4:
    print(x)
    x += 1    # x = x + 1
```

Salida:

```
0
1
2
3
```

### Cuidado con los bucles infinitos

Si la condición nunca se hace `False`, el bucle no acaba nunca:

```python
# ¡Esto bloquea tu terminal!
while True:
    print("Esto no para nunca...")
```

Para salir de un bucle infinito, pulsa **Ctrl+C** en la terminal.

---

## ⚠️ Manejo de errores: try / except

Python lanza **excepciones** cuando algo falla. Puedes capturarlas con `try/except`:

```python
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("No se puede dividir por cero")
```

### Capturar el error

Puedes guardar la excepción en una variable para inspeccionarla:

```python
try:
    numeros = [1, 2, 3]
    print(numeros[10])
except IndexError as e:
    print(f"Error: {e}")
```

### Múltiples excepciones

```python
try:
    x = int(input("Dame un número: "))
    resultado = 10 / x
except ValueError:
    print("No es un número válido")
except ZeroDivisionError:
    print("No se puede dividir por cero")
```

### Bloque finally

`finally` se ejecuta **siempre**, haya fallado o no:

```python
try:
    f = open("archivo.txt")
    contenido = f.read()
except FileNotFoundError:
    print("Archivo no encontrado")
finally:
    print("Esto se imprime siempre")
```

---

## 🔃 Iterables e iteradores

Un **iterable** es cualquier objeto sobre el que puedes hacer un `for`: listas, tuplas, strings, diccionarios, conjuntos, `range`…

```python
mi_lista = [1, 2, 3]

# La función iter() crea un iterador
mi_iterador = iter(mi_lista)

next(mi_iterador)   # => 1
next(mi_iterador)   # => 2
next(mi_iterador)   # => 3
next(mi_iterador)   # StopIteration (ya no hay elementos)
```

Los iteradores son la base de los bucles `for`. Cuando escribes `for x in iterable`, Python usa un iterador por debajo.

---

## 🧩 Comprensiones (preview)

Las comprensiones permiten crear listas, diccionarios y conjuntos de forma concisa. Ya las veremos en detalle en el [punto 6](/ApuntesPSP/00-python-basico/06-funciones), pero aquí un adelanto:

```python
# Comprensión de lista
[ x ** 2 for x in range(5) ]   # => [0, 1, 4, 9, 16]

# Con condición
[ x for x in range(10) if x % 2 == 0 ]   # => [0, 2, 4, 6, 8]
```

---

## 🧠 Mini-chequeo

1. ¿Qué imprime `for i in range(3): print(i)`?
2. ¿Qué pasa si olvidas el `:` al final de un `if`?
3. ¿Cómo capturas un `ValueError` en un `try/except`?

<details>
<summary>🔄 Respuestas</summary>

1. Imprime `0`, `1`, `2` (uno en cada línea). `range(3)` va de 0 a 2.
2. Python lanza un error de sintaxis: `SyntaxError: invalid syntax`.
3. `except ValueError:` o `except ValueError as e:` si quieres guardar el mensaje de error.

</details>

---

## ✅ Resumen en 3 frases

- `if/elif/else` toma decisiones; la indentación define los bloques.
- `for` itera sobre iterables; `while` itera mientras haya condición.
- `try/except` captura errores sin que el programa se rompa.

---

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| **Iterable** | Objeto sobre el que se puede iterar (lista, string, range…) |
| **Iterador** | Objeto que recorre un iterable elemento a elemento |
| **Excepción** | Error que se lanza durante la ejecución |
| **Indentación** | Sangría (4 espacios) que define bloques de código |
| **Comprensión** | Sintaxis concisa para crear colecciones con un bucle |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/00-python-basico) · **Anterior:** [04 · Variables y colecciones](/ApuntesPSP/00-python-basico/04-variables-y-colecciones) · **Siguiente:** [06 · Funciones](/ApuntesPSP/00-python-basico/06-funciones)
