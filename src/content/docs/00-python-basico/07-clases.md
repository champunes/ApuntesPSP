---
title: 07 — Clases
description: class, __init__, métodos, classmethod y staticmethod 🏗️
---

<p><small>class, __init__, métodos, classmethod y staticmethod 🏗️</small></p>

> 🗺️ **Estás en:** 🐍 **U00 · Python 3 básico** → 07 · Clases

---

## 📬 La idea en una frase

> Una clase es un plano para crear objetos. Los objetos tienen atributos (datos) y métodos (funciones que operan con esos datos). Las clases organizan el código y permiten la reutilización.

Python es un lenguaje **orientado a objetos**. Todo es un objeto: un entero, un string, una lista… En esta unidad aprenderás a crear tus propias clases, que es donde la potencia de Python brilla de verdad.

---

## 🏗️ Definir una clase

```python
class Humano:
    # Atributo de clase (compartido por todas las instancias)
    especie = "H. sapiens"

    # Constructor
    def __init__(self, nombre):
        # Atributo de instancia (propio de cada objeto)
        self.nombre = nombre

    # Método de instancia
    def decir(self, msg):
        return f"{self.nombre}: {msg}"

    # Método de clase (compartido, recibe la clase como primer argumento)
    @classmethod
    def get_especie(cls):
        return cls.especie

    # Método estático (no recibe ni instancia ni clase)
    @staticmethod
    def roncar():
        return "*roncar*"
```

### Diferencia entre tipos de métodos

| Tipo | Primer argumento | Para qué sirve |
|---|---|---|
| **Instancia** | `self` | Opera con los datos de un objeto concreto |
| **Clase** | `cls` | Opera con la clase en general (no necesita instancia) |
| **Estático** | Ninguno | Función utilitaria que no depende de la clase ni de la instancia |

---

## 🎭 Crear y usar objetos

```python
# Instanciar una clase
i = Humano(nombre="Ian")
print(i.decir("hola"))     # => "Ian: hola"

j = Humano("Joel")
print(j.decir("hey"))      # => "Joel: hey"
```

### Métodos de clase

```python
i.get_especie()   # => "H. sapiens"

# Cambiar el atributo de clase
Humano.especie = "H. neanderthalensis"
i.get_especie()   # => "H. neanderthalensis"
j.get_especie()   # => "H. neanderthalensis"
```

### Métodos estáticos

```python
Humano.roncar()   # => "*roncar*"
```

---

## 🔑 El método `__init__`

`__init__` es el **constructor** de la clase. Se ejecuta automáticamente cuando creas un nuevo objeto:

```python
class Coche:
    def __init__(self, marca, modelo, año):
        self.marca = marca
        self.modelo = modelo
        self.año = año

mi_coche = Coche("Seat", "León", 2022)
print(mi_coche.marca)   # => "Seat"
```

### Atributos por defecto

Puedes dar valores por defecto a los parámetros:

```python
class Coche:
    def __init__(self, marca, modelo, año=2024):
        self.marca = marca
        self.modelo = modelo
        self.año = año

mi_coche = Coche("Seat", "León")   # año = 2024 por defecto
```

---

## 📋 Métodos útiles

### `__str__` y `__repr__`

Estos métodos especiales definen cómo se muestra un objeto:

```python
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

    def __str__(self):
        return f"{self.nombre}, {self.edad} años"

    def __repr__(self):
        return f"Persona('{self.nombre}', {self.edad})"

p = Persona("Ana", 25)
print(p)         # => "Ana, 25 años" (usa __str__)
repr(p)          # => "Persona('Ana', 25)" (usa __repr__)
```

### Herencia

Una clase puede **heredar** de otra:

```python
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def hablar(self):
        raise NotImplementedError("Subclase debe implementar hablar()")

class Perro(Animal):
    def hablar(self):
        return "Guau"

class Gato(Animal):
    def hablar(self):
        return "Miau"

perro = Perro("Toby")
print(perro.hablar())   # => "Guau"
```

---

## 🧠 Mini-chequeo

1. ¿Cuál es la diferencia entre un atributo de clase y uno de instancia?
2. ¿Qué hace `self` en un método de instancia?
3. ¿Cuándo se usa `@staticmethod` en lugar de un método normal?

<details>
<summary>🔄 Respuestas</summary>

1. El atributo de clase es **compartido** por todos los objetos de la misma clase. El de instancia es **propio** de cada objeto.
2. `self` es la referencia al objeto actual. Permite acceder a sus atributos y métodos dentro de la clase.
3. Cuando el método no necesita acceder a `self` ni a `cls`: es una función utilitaria que "vive" dentro de la clase por convención.

</details>

---

## ✅ Resumen en 3 frases

- Una clase es un plano; un objeto es una instancia de ese plano.
- `__init__` inicializa los atributos; `self` referencia al objeto actual.
- Los métodos de clase (`@classmethod`) operan sobre la clase; los estáticos (`@staticmethod`) no dependen de nada.

---

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| **Clase** | Plano o plantilla para crear objetos |
| **Objeto/Instancia** | Ejemplo concreto de una clase |
| **Atributo** | Dato que pertenece a un objeto |
| **Método** | Función que pertenece a una clase |
| **self** | Referencia al objeto actual dentro de un método |
| **Herencia** | Una clase hijo hereda atributos y métodos de una clase padre |
| **__init__** | Constructor: se ejecuta al crear un objeto |
| **@classmethod** | Método que opera sobre la clase, no sobre una instancia |
| **@staticmethod** | Método que no depende ni de la clase ni de la instancia |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/00-python-basico) · **Anterior:** [06 · Funciones](/ApuntesPSP/00-python-basico/06-funciones) · **Siguiente:** [08 · Módulos y avanzado](/ApuntesPSP/00-python-basico/08-modulos-y-avanzado)
