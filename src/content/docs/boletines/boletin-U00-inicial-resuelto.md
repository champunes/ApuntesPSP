---
title: Boletín U01 — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de Python 3
---

# ✅ Boletín U01 — Inicial (Resuelto)

---

## 1. Hola mundo con f-string

```python
nombre = input("¿Cómo te llamas? ")
print(f"Hola, {nombre}. ¡Bienvenido a Python!")
```

## 2. Calculadora básica

```python
a = float(input("Dame un número: "))
b = float(input("Dame otro número: "))

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} x {b} = {a * b}")

if b != 0:
    print(f"{a} / {b} = {a / b}")
else:
    print("No se puede dividir por cero")
```

## 3. Par o impar

```python
numero = int(input("Dame un número: "))

if numero % 2 == 0:
    print(f"{numero} es par")
else:
    print(f"{numero} es impar")
```

## 4. Tabla de multiplicar

```python
numero = int(input("Dame un número: "))

for i in range(1, 11):
    print(f"{numero} x {i} = {numero * i}")
```

## 5. Invertir una cadena

```python
cadena = input("Dame una cadena: ")
invertida = cadena[::-1]
print(f"La cadena invertida es: {invertida}")
```

## 6. Lista de la compra

```python
compra = []

while True:
    print("\n1. Añadir producto")
    print("2. Ver productos")
    print("3. Eliminar producto")
    print("4. Salir")
    opcion = input("Elige una opción: ")

    if opcion == "1":
        producto = input("Nombre del producto: ")
        compra.append(producto)
        print(f"'{producto}' añadido.")
    elif opcion == "2":
        if compra:
            for i, p in enumerate(compra, 1):
                print(f"  {i}. {p}")
        else:
            print("La lista está vacía.")
    elif opcion == "3":
        producto = input("Nombre del producto a eliminar: ")
        if producto in compra:
            compra.remove(producto)
            print(f"'{producto}' eliminado.")
        else:
            print("Producto no encontrado.")
    elif opcion == "4":
        break
```

## 7. Diccionario de alumnos

```python
alumnos = {}

while True:
    print("\n1. Añadir alumno")
    print("2. Buscar nota")
    print("3. Nota media")
    print("4. Nota más alta")
    print("5. Salir")
    opcion = input("Elige una opción: ")

    if opcion == "1":
        nombre = input("Nombre del alumno: ")
        nota = float(input("Nota: "))
        alumnos[nombre] = nota
        print(f"'{nombre}' añadido con nota {nota}.")
    elif opcion == "2":
        nombre = input("Nombre del alumno: ")
        if nombre in alumnos:
            print(f"Nota de {nombre}: {alumnos[nombre]}")
        else:
            print("Alumno no encontrado.")
    elif opcion == "3":
        if alumnos:
            media = sum(alumnos.values()) / len(alumnos)
            print(f"Nota media: {media:.2f}")
        else:
            print("No hay alumnos.")
    elif opcion == "4":
        if alumnos:
            max_nota = max(alumnos.values())
            mejor = [n for n, nota in alumnos.items() if nota == max_nota]
            print(f"Nota más alta: {max_nota} ({', '.join(mejor)})")
        else:
            print("No hay alumnos.")
    elif opcion == "5":
        break
```

## 8. Clase Coche

```python
from datetime import datetime


class Coche:
    def __init__(self, marca, modelo, año):
        self.marca = marca
        self.modelo = modelo
        self.año = año

    def descripcion(self):
        return f"{self.marca} {self.modelo} ({self.año})"

    def es_antiguo(self):
        año_actual = datetime.now().year
        return (año_actual - self.año) > 10


# Pruebas
coche = Coche("Seat", "León", 2015)
print(coche.descripcion())   # Seat León (2015)
print(coche.es_antiguo())    # True

coche2 = Coche("Tesla", "Model 3", 2023)
print(coche2.descripcion())  # Tesla Model 3 (2023)
print(coche2.es_antiguo())   # False
```
