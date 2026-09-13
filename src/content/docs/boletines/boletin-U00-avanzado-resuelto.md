---
title: Boletín U01 — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de Python 3
---

# ✅ Boletín U01 — Avanzado (Resuelto)

---

## 1. Comprensiones de lista

```python
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
frase = "aprende python en la fp"
cadena = "hola mundo"

# Cuadrados de los pares
cuadrados_pares = [x ** 2 for x in numeros if x % 2 == 0]
print(cuadrados_pares)   # [4, 16, 36, 64, 100]

# Longitudes de cada palabra
longitudes = [len(palabra) for palabra in frase.split()]
print(longitudes)        # [8, 6, 2, 2, 2]

# Caracteres en mayúsculas
mayusculas = [c.upper() for c in cadena]
print(mayusculas)        # ['H', 'O', 'L', 'A', ' ', 'M', 'U', 'N', 'D', 'O']
```

## 2. Manejo de archivos

```python
notas = [7, 8, 6, 9, 8]

# 1. Crear el archivo
with open("notas.txt", "w") as f:
    for nota in notas:
        f.write(f"{nota}\n")

# 2. Leer y calcular media
with open("notas.txt", "r") as f:
    lineas = f.readlines()
    notas_leidas = [float(linea.strip()) for linea in lineas]
    media = sum(notas_leidas) / len(notas_leidas)

# 3. Añadir la media al final
with open("notas.txt", "a") as f:
    f.write(f"{media:.2f}\n")

# 4. Mostrar todas las líneas
with open("notas.txt", "r") as f:
    print(f.read())
```

## 3. Lambda con reduce

```python
from functools import reduce

numeros = [2, 3, 4, 5]
producto = reduce(lambda a, b: a * b, numeros)
print(producto)   # 120
```

## 4. Clase Cuenta Bancaria

```python
class CuentaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def ingresar(self, cantidad):
        if cantidad > 0:
            self.saldo += cantidad
        else:
            print("La cantidad a ingresar debe ser positiva")

    def retirar(self, cantidad):
        if cantidad > 0:
            self.saldo -= cantidad
        else:
            print("La cantidad a retirar debe ser positiva")

    def __str__(self):
        return f"Titular: {self.titular} — Saldo: {self.saldo} €"

    def __eq__(self, other):
        return self.titular == other.titular and self.saldo == other.saldo


# Pruebas
c1 = CuentaBancaria("Ana", 1000)
c1.ingresar(500)
c1.retirar(200)
print(c1)   # Titular: Ana — Saldo: 1300 €

c2 = CuentaBancaria("Ana", 1300)
print(c1 == c2)   # True
```

## 5. Decorador de rendimiento

```python
import time
from functools import wraps


def medir_tiempo(funcion):
    @wraps(funcion)
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = funcion(*args, **kwargs)
        fin = time.time()
        print(f"{funcion.__name__} tardó {fin - inicio:.4f} segundos")
        return resultado
    return wrapper


@medir_tiempo
def funcion_lenta():
    time.sleep(1)
    print("¡Acabó!")


funcion_lenta()
# Imprime:
# ¡Acabó!
# funcion_lenta tardó 1.0012 segundos
```

## 6. Generador de Fibonacci

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b


for num in fibonacci(10):
    print(num, end=" ")
# Salida: 0 1 1 2 3 5 8 13 21 34
```

## 7. Gestor de errores personalizado

```python
class SaldoInsuficienteError(Exception):
    pass


class CuentaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def ingresar(self, cantidad):
        if cantidad > 0:
            self.saldo += cantidad

    def retirar(self, cantidad):
        if cantidad > self.saldo:
            raise SaldoInsuficienteError(
                f"Saldo insuficiente: tienes {self.saldo} €, "
                f"intentas retirar {cantidad} €"
            )
        self.saldo -= cantidad


# Prueba
c = CuentaBancaria("Bob", 100)
try:
    c.retirar(200)
except SaldoInsuficienteError as e:
    print(e)   # Saldo insuficiente: tienes 100 €, intentas retirar 200 €
```

## 8. Mini inventario con set operations

```python
tienda_a = {"manzana", "plátano", "naranja", "leche"}
tienda_b = {"plátano", "leche", "pan", "huevos"}

# Productos en ambas tiendas (intersección)
ambas = tienda_a & tienda_b
print(f"En ambas: {ambas}")   # {'plátano', 'leche'}

# Exclusivos de cada tienda (diferencia)
solo_a = tienda_a - tienda_b
solo_b = tienda_b - tienda_a
print(f"Solo en A: {solo_a}")   # {'manzana', 'naranja'}
print(f"Solo en B: {solo_b}")   # {'pan', 'huevos'}

# Todos los productos (unión)
todos = tienda_a | tienda_b
print(f"Todos: {todos}")

# En una pero no en la otra (diferencia simétrica)
exclusivos = tienda_a ^ tienda_b
print(f"Exclusivos: {exclusivos}")   # {'manzana', 'naranja', 'pan', 'huevos'}
```

## 9. Parser de CSV sencillo

```python
def leer_csv(nombre_fichero):
    with open(nombre_fichero, "r") as f:
        lineas = f.readlines()

    if not lineas:
        return []

    claves = lineas[0].strip().split(",")
    resultado = []

    for linea in lineas[1:]:
        valores = linea.strip().split(",")
        fila = dict(zip(claves, valores))
        resultado.append(fila)

    return resultado


# Prueba
resultado = leer_csv("datos.csv")
for fila in resultado:
    print(fila)
# {'nombre': 'Ana', 'edad': '25', 'ciudad': 'Madrid'}
# {'nombre': 'Bob', 'edad': '30', 'ciudad': 'Barcelona'}
# {'nombre': 'Clara', 'edad': '22', 'ciudad': 'Valencia'}
```
