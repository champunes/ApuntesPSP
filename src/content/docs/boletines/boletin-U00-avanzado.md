---
title: Boletín U01 — Avanzado
description: Ejercicios avanzados de Python 3
---

# 💪 Boletín U01 — Avanzado

> Ejercicios que requieren aplicar los conceptos de Python 3 de forma más profunda, con programas completos y casos reales.

---

## 1. Comprensiones de lista

Dada una lista de números, crea en **una sola línea** con comprensión de lista:
- Una lista con los cuadrados de los números pares.
- Una lista con las longitudes de cada palabra de una frase.
- Una lista con los caracteres en mayúsculas de una cadena.

```python
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
frase = "aprende python en la fp"
cadena = "hola mundo"
```

**Pista:** para las longitudes: `[len(palabra) for palabra in frase.split()]`.

## 2. Manejo de archivos

Crea un programa que:
1. Cree un archivo `notas.txt` con 5 notas (una por línea).
2. Lea el archivo y calcule la nota media.
3. Añada al final del archivo la media calculada.
4. Muestre todas las líneas del archivo.

```python
notas = [7, 8, 6, 9, 8]
```

**Pista:** usa `with open("notas.txt", "w") as f:` para escribir y `"r"` para leer.

## 3. Lambda con reduce

Usando `functools.reduce` y una función lambda, crea una función que multiplique todos los elementos de una lista entre sí.

```python
from functools import reduce
numeros = [2, 3, 4, 5]
# Resultado: 120 (2 * 3 * 4 * 5)
```

**Pista:** `reduce(lambda a, b: a * b, numeros)`.

## 4. Clase Cuenta Bancaria

Crea una clase `CuentaBancaria` con:
- Atributo `titular` y `saldo` (por defecto 0).
- Método `ingresar(cantidad)`: suma al saldo (no puede ser negativa).
- Método `retirar(cantidad)`: resta al saldo si hay suficiente; si no, muestra un aviso.
- Método `__str__`: devuelve `"Titular: X — Saldo: Y €"`.
- Método `__eq__`: dos cuentas son iguales si tienen el mismo titular y saldo.

```python
c1 = CuentaBancaria("Ana", 1000)
c1.ingresar(500)
c1.retirar(200)
print(c1)   # Titular: Ana — Saldo: 1300 €
```

**Pista:** el método `__eq__` se llama automáticamente al usar `==`.

## 5. Decorador de rendimiento

Crea un decorador `medir_tiempo` que mida cuántos segundos tarda una función en ejecutarse e imprima el resultado.

```python
import time

@medir_tiempo
def funcion_lenta():
    time.sleep(1)
    print("¡Acabó!")

funcion_lenta()
# Imprime: "funcion_lenta tardó 1.0012 segundos"
```

**Pista:** usa `time.time()` antes y después de llamar a la función, y `@wraps` del módulo `functools`.

## 6. Generador de Fibonacci

Crea un generador `fibonacci(n)` que produzca los primeros `n` números de la sucesión de Fibonacci.

```python
for num in fibonacci(10):
    print(num, end=" ")
# Salida: 0 1 1 2 3 5 8 13 21 34
```

**Pista:** la sucesión empieza con 0 y 1, y cada número siguiente es la suma de los dos anteriores. Guarda los dos últimos valores en variables.

## 7. Gestor de errores personalizado

Crea una excepción personalizada `SaldoInsuficienteError` y úsala en la clase `CuentaBancaria` del ejercicio 4. Cuando el usuario intente retirar más de lo que tiene, debe lanzar esa excepción en lugar de imprimir un aviso.

```python
c = CuentaBancaria("Bob", 100)
try:
    c.retirar(200)
except SaldoInsuficienteError as e:
    print(e)   # "Saldo insuficiente: tienes 100 €, intentas retirar 200 €"
```

**Pista:** define la clase como `class SaldoInsuficienteError(Exception): pass` y en `retirar` usa `raise SaldoInsuficienteError(...)`.

## 8. Mini inventario con set operations

Crea dos conjuntos de productos: `tienda_a` y `tienda_b`. El programa debe:
1. Calcular los productos que están en ambas tiendas (intersección).
2. Calcular los productos exclusivos de cada tienda (diferencia).
3. Calcular todos los productos sin duplicados (unión).
4. Calcular los productos que están en una tienda pero no en la otra (diferencia simétrica).

```python
tienda_a = {"manzana", "plátano", "naranja", "leche"}
tienda_b = {"plátano", "leche", "pan", "huevos"}
```

**Pista:** la diferencia simétrica se calcula con `^` o con `symmetric_difference()`.

## 9. Parser de CSV sencillo

Crea una función `leer_csv(nombre_fichero)` que lea un archivo CSV sin usar la biblioteca `csv`. La función debe devolver una lista de diccionarios, donde cada diccionario representa una fila y las claves son los nombres de las columnas del encabezado.

```csv
nombre,edad,ciudad
Ana,25,Madrid
Bob,30,Barcelona
Clara,22,Valencia
```

```python
resultado = leer_csv("datos.csv")
print(resultado[0])   # {'nombre': 'Ana', 'edad': '25', 'ciudad': 'Madrid'}
```

**Pista:** lee la primera línea para obtener las claves, luego recorre el resto dividiendo cada línea por `","`.
