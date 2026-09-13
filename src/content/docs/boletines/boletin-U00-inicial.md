---
title: Boletín U02 — Inicial
description: Ejercicios básicos de Python 3
---

# 📝 Boletín U02 — Inicial

> Ejercicios básicos para afianzar los conceptos de comentarios, tipos de datos, variables, colecciones, control de flujo, funciones y clases de la unidad U02.

---

## 1. Hola mundo con f-string

Crea un programa que pida tu nombre con `input()` y salude usando un f-string:

```
¿Cómo te llamas? Ana
Hola, Ana. ¡Bienvenido a Python!
```

## 2. Calculadora básica

Crea un programa que pida dos números y muestre su suma, resta, multiplicación y división. Muestra el resultado de cada operación con un f-string.

**Pista:** usa `float(input("Dame un número: "))` para que acepte decimales.

## 3. Par o impar

Pide un número entero al usuario y dice si es par o impar usando el operador `%`.

```
Dame un número: 7
7 es impar
```

## 4. Tabla de multiplicar

Pide un número y muestra su tabla de multiplicar del 1 al 10.

```
Dame un número: 5
5 x 1 = 5
5 x 2 = 10
...
5 x 10 = 50
```

**Pista:** usa un bucle `for` con `range(1, 11)`.

## 5. Invertir una cadena

Crea un programa que pida una cadena de texto y la muestre al revés.

```
Dame una cadena: hola
La cadena invertida es: aloh
```

**Pista:** en Python, `"cadena"[::-1]` invierte una cadena.

## 6. Lista de la compra

Crea un programa con un menú que permita:
1. Añadir un producto a una lista
2. Ver todos los productos
3. Eliminar un producto
4. Salir

Usa un bucle `while True` y `input()` para el menú.

## 7. Diccionario de alumnos

Crea un diccionario donde las claves sean nombres de alumnos y los valores sean sus notas. El programa debe:
1. Añadir un alumno con su nota
2. Buscar la nota de un alumno
3. Calcular la nota media de todos los alumnos
4. Mostrar quién tiene la nota más alta

**Pista:** usa `max(diccionario.values())` para la nota más alta y `sum(values()) / len(values())` para la media.

## 8. Clase Coche

Crea una clase `Coche` con atributos `marca`, `modelo` y `año`. Añade un método `descripcion()` que devuelva un string con todos los datos y un método `es_antiguo()` que devuelva `True` si el coche tiene más de 10 años.

```python
coche = Coche("Seat", "León", 2015)
print(coche.descripcion())   # Seat León (2015)
print(coche.es_antiguo())    # True
```

**Pista:** para calcular el año actual, puedes usar `from datetime import datetime` y `datetime.now().year`.
