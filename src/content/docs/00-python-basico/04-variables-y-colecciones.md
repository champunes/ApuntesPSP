---
title: 04 — Variables y colecciones
description: Variables, listas, tuplas, diccionarios, conjuntos y slicing 📦
---

<p><small>Variables, listas, tuplas, diccionarios, conjuntos y slicing 📦</small></p>

> 🗺️ **Estás en:** 🐍 **U00 · Python 3 básico** → 04 · Variables y colecciones

---

## 📬 La idea en una frase

> Las variables almacenan datos y las colecciones agrupan varios datos en una sola estructura. Python ofrece listas (mutables), tuplas (inmutables), diccionarios (clave:valor) y conjuntos (sin duplicados).

Las colecciones son la base de casi todo programa. Si sabes manejarlas bien, el resto del módulo será mucho más fácil.

---

## 📌 Variables

En Python no hace falta declarar variables antes de usarlas. Simplemente asignas un nombre a un valor:

```python
nombre = "Ana"
edad = 22
activa = True
```

### Convenciones de nombres

La convención oficial (PEP 8) es usar **snake_case**: palabras en minúscula separadas por guion bajo:

```python
# Bien
mi_variable = 5
nombre_completo = "Ana García"

# Mal (pero funciona)
miVariable = 5        # CamelCase
MiVariable = 5        # PascalCase
```

### Errores comunes

Si accedes a una variable que no existe, Python lanza un error `NameError`:

```python
otra_variable  # NameError: name 'otra_variable' is not defined
```

---

## 📋 Listas

Las listas son la colección más usada en Python. Almacenan una secuencia de elementos y son **mutables** (puedes cambiarlas después de crearlas).

```python
# Lista vacía
lista = []

# Lista prellenada
otra_lista = [4, 5, 6]
```

### Añadir y eliminar elementos

```python
lista.append(1)     # lista = [1]
lista.append(2)     # lista = [1, 2]
lista.append(4)     # lista = [1, 2, 4]
lista.append(3)     # lista = [1, 2, 4, 3]

lista.pop()         # => 3  (elimina y devuelve el último)
# lista ahora es [1, 2, 4]
```

### Acceso por índice

Los índices empiezan en 0. Python también permite índices negativos (-1 es el último):

```python
lista = [1, 2, 4, 3]

lista[0]     # => 1
lista[-1]    # => 3
lista[4]     # IndexError: list index out of range
```

### Slicing (rebanado)

El slicing extrae una porción de la lista con la sintaxis `lista[inicio:final:pasos]`:

```python
lista = [1, 2, 4, 3]

lista[1:3]    # => [2, 4]      (del índice 1 al 2, sin incluir el 3)
lista[2:]     # => [4, 3]      (desde el índice 2 hasta el final)
lista[:3]     # => [1, 2, 4]   (desde el inicio hasta el índice 2)
lista[::2]    # => [1, 4]      (cada dos elementos)
lista[::-1]   # => [3, 4, 2, 1]  (invertir la lista)
```

### Otras operaciones

```python
del lista[2]           # Elimina el elemento en índice 2 (el 4): lista ahora es [1, 2, 3]

lista + otra_lista     # => [1, 2, 3, 4, 5, 6] (no modifica las originales)

lista.extend(otra_lista)  # Añade otra_lista al final de lista (modifica lista)

1 in lista             # => True (comprobar existencia)

len(lista)             # => 6 (longitud)
```

---

## 🔒 Tuplas

Las tuplas son como las listas, pero **inmutables**: una vez creadas, no puedes cambiar nada.

```python
tupla = (1, 2, 3)
tupla[0]       # => 1
tupla[0] = 3   # TypeError: 'tuple' does not support item assignment
```

### Operaciones válidas

```python
len(tupla)              # => 3
tupla + (4, 5, 6)       # => (1, 2, 3, 4, 5, 6)
tupla[:2]               # => (1, 2)
2 in tupla              # => True
```

### Desempaquetado

Una de las cosas más elegantes de Python: puedes asignar múltiples variables de golpe:

```python
a, b, c = (1, 2, 3)    # a=1, b=2, c=3

# Sin paréntesis (Python crea la tupla automáticamente)
d, e, f = 4, 5, 6

# Intercambiar valores sin variable temporal
e, d = d, e             # d=5, e=4
```

---

## 📖 Diccionarios

Los diccionarios almacenan pares **clave:valor**. Son ideales para datos estructurados.

```python
# Diccionario vacío
dicc_vacio = {}

# Diccionario prellenado
dicc_lleno = {"uno": 1, "dos": 2, "tres": 3}
```

### Acceder a valores

```python
dicc_lleno["uno"]       # => 1

# Buscar una clave inexistente lanza KeyError
dicc_lleno["cuatro"]    # KeyError
```

### Método get (seguro)

```python
dicc_lleno.get("uno")        # => 1
dicc_lleno.get("cuatro")     # None (no lanza error)
dicc_lleno.get("cuatro", 4)  # => 4 (valor por defecto)
```

### Claves y valores

```python
list(dicc_lleno.keys())    # => ["uno", "dos", "tres"]
list(dicc_lleno.values())  # => [1, 2, 3]
```

### Añadir, modificar y eliminar

```python
dicc_lleno["cuatro"] = 4       # Añadir o modificar
dicc_lleno.setdefault("cinco", 5)  # Solo si la clave no existe

del dicc_lleno["uno"]          # Eliminar una clave
```

### Comprobar existencia

```python
"uno" in dicc_lleno    # => True
1 in dicc_lleno        # => False (1 es un valor, no una clave)
```

---

## 🔵 Conjuntos (set)

Los conjuntos almacenan elementos **sin duplicados** y permiten operaciones de teoría de conjuntos.

```python
# Conjunto vacío (¡cuidado! {} crea un dict, no un set)
conjunto_vacio = set()

# Conjunto con valores (los duplicados se eliminan automáticamente)
un_conjunto = {1, 2, 2, 3, 4}   # => {1, 2, 3, 4}
```

### Operaciones de conjuntos

```python
otro_conjunto = {3, 4, 5, 6}

# Intersección (elementos comunes)
un_conjunto & otro_conjunto    # => {3, 4}

# Unión (todos los elementos)
un_conjunto | otro_conjunto    # => {1, 2, 3, 4, 5, 6}

# Diferencia (en uno pero no en otro)
{1, 2, 3, 4} - {2, 3, 5}     # => {1, 4}
```

### Añadir y comprobar

```python
un_conjunto.add(5)    # => {1, 2, 3, 4, 5}
2 in un_conjunto      # => True
10 in un_conjunto     # => False
```

---

## 🧠 Mini-chequeo

1. ¿Cuál es la diferencia entre una lista y una tupla?
2. ¿Qué devuelve `{1, 2, 2, 3}`?
3. ¿Cómo accedes al último elemento de una lista `mi_lista`?

<details>
<summary>🔄 Respuestas</summary>

1. La lista es **mutable** (puedes añadir, eliminar y cambiar elementos). La tupla es **inmutable** (una vez creada, no cambia).
2. `{1, 2, 3}`: los conjuntos eliminan duplicados automáticamente.
3. `mi_lista[-1]`: el índice `-1` accede al último elemento.

</details>

---

## ✅ Resumen en 3 frases

- Las variables no se declaran: simplemente asignas un valor con `=`.
- Las listas son mutables y usan índices; las tuplas son inmutables; los diccionarios usan claves; los conjuntos eliminan duplicados.
- El slicing `lista[inicio:final:pasos]` extrae porciones de listas y strings de forma elegante.

---

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| **snake_case** | Convención de nombres: minúsculas con guion bajo |
| **Mutable** | Que puede cambiar después de creado |
| **Inmutable** | Que no puede cambiar |
| **Slicing** | Extraer una porción de una secuencia |
| **Desempaquetado** | Asignar múltiples variables de golpe |
| **Clave:valor** | Par de datos en un diccionario |
| **Set** | Conjunto sin duplicados |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/00-python-basico) · **Anterior:** [03 · Tipos de datos y operadores](/ApuntesPSP/00-python-basico/03-tipos-de-datos) · **Siguiente:** [05 · Control de flujo](/ApuntesPSP/00-python-basico/05-control-de-flujo)
