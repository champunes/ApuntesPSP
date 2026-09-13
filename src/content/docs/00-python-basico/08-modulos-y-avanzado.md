---
title: 08 — Módulos y avanzado
description: import, pip, generadores y decoradores 📦
---

<p><small>import, pip, generadores y decoradores 📦</small></p>

> 🗺️ **Estás en:** 🐍 **U01 · Python 3 básico** → 08 · Módulos y avanzado

---

## 📬 La idea en una frase

> Los módulos son archivos `.py` con código reutilizable. Python trae cientos en su biblioteca estándar y `pip` te permite instalar miles más. Los generadores y decoradores son herramientas avanzadas que simplifican el código.

Esta unidad cierra la parte teórica de Python básico. Con lo que ya sabes (tipos, colecciones, control, funciones, clases) puedes escribir programas completos. Los módulos amplían tus posibilidades y los generadores/decoradores te dan superpoderes.

---

## 📦 Importar módulos

Un módulo es simplemente un archivo `.py`. Para usarlo, lo importas:

```python
import math

print(math.sqrt(16))   # => 4.0
```

### Formas de importar

```python
# Importar el módulo completo
import math
math.sqrt(16)

# Importar funciones específicas
from math import ceil, floor
ceil(3.7)    # => 4.0
floor(3.7)   # => 3.0

# Importar con alias
import math as m
m.sqrt(16)

# Importar todo (¡no recomendado!)
from math import *
```

### ¿Por qué no usar `from math import *`?

Porque puede haber **conflictos de nombres**. Si tu archivo define una función `sqrt` y haces `from math import *`, la tuya se pierde.

---

## 🔍 Explorar módulos

```python
import math
dir(math)   # Lista todas las funciones y atributos del módulo
```

También puedes ver la documentación con `help()`:

```python
help(math.sqrt)
```

---

## 🛒 pip: instalar paquetes

`pip` es el gestor de paquetes de Python. Con él puedes instalar librerías creadas por otros:

```bash
# Instalar un paquete
pip install requests

# Instalar una versión concreta
pip install requests==2.28.0

# Listar paquetes instalados
pip list

# Desinstalar
pip uninstall requests
```

Los paquetes se instalan desde [PyPI](https://pypi.org/) (Python Package Index), el repositorio oficial con más de 400.000 paquetes.

### El archivo requirements.txt

En proyectos reales, se guarda la lista de dependencias en un archivo `requirements.txt`:

```
requests==2.28.0
pycryptodome==3.19.0
openai==1.0.0
```

Para instalar todas las dependencias de golpe:

```bash
pip install -r requirements.txt
```

---

## ⚡ Generadores

Los generadores crean valores **sobre la marcha** en lugar de generarlos todos de golpe. Son ideales para secuencias grandes.

### La palabra clave yield

```python
def duplicar_numeros(iterable):
    for i in iterable:
        yield i + i
```

Cuando una función contiene `yield`, se convierte en un generador. No devuelve todos los valores de golpe; los va **produciendo** uno a uno:

```python
_rango = range(1, 900000000)

for i in duplicar_numeros(_rango):
    print(i)
    if i >= 30:
        break
```

Esto es **eficiente**: no crea una lista de 900 millones de números en memoria. Va produciendo valores uno a uno y, cuando haces `break`, deja de generar.

### Generador vs lista

```python
# Lista: ocupa memoria para todos los elementos
cuadrados_lista = [x ** 2 for x in range(1000000)]

# Generador: ocupa casi nada de memoria
cuadrados_gen = (x ** 2 for x in range(1000000))
```

La diferencia es el operador: `[]` crea una lista, `()` crea un generador.

---

## 🎀 Decoradores

Un decorador es una función que **envuelve** a otra función para añadirle comportamiento sin modificarla.

### Ejemplo básico

```python
from functools import wraps

def mi_decorador(funcion):
    @wraps(funcion)
    def wrapper(*args, **kwargs):
        print("Antes de llamar a la función")
        resultado = funcion(*args, **kwargs)
        print("Después de llamar a la función")
        return resultado
    return wrapper

@mi_decorador
def saludar(nombre):
    print(f"Hola, {nombre}")

saludar("Ana")
```

Salida:

```
Antes de llamar a la función
Hola, Ana
Después de llamar a la función
```

### Decorador con parámetros

```python
def pedir(funcion):
    @wraps(funcion)
    def wrapper(*args, **kwargs):
        mensaje, decir_por_favor = funcion(*args, **kwargs)
        if decir_por_favor:
            return f"{mensaje} ¡Por favor! Soy pobre :("
        return mensaje
    return wrapper

@pedir
def say(decir_por_favor=False):
    mensaje = "¿Puedes comprarme una cerveza?"
    return mensaje, decir_por_favor

print(say())                        # ¿Puedes comprarme una cerveza?
print(say(decir_por_favor=True))    # ¿Puedes comprarme una cerveza? ¡Por favor! Soy pobre :(
```

### Decoradores habituales

Python trae algunos decoradores integrados:

```python
class MiClase:
    @classmethod          # Método de clase
    def metodo_clase(cls):
        pass

    @staticmethod         # Método estático
    def metodo_estatico():
        pass

    @property             # Propiedad (getter)
    def nombre(self):
        return self._nombre
```

Los verás mucho en el módulo PSP, especialmente con `@classmethod` y `@staticmethod`.

---

## 🧠 Mini-chequeo

1. ¿Qué diferencia hay entre `import math` y `from math import sqrt`?
2. ¿Cuándo es mejor usar un generador que una lista?
3. ¿Qué hace un decorador a una función?

<details>
<summary>🔄 Respuestas</summary>

1. Con `import math` importas todo el módulo y accedes con `math.sqrt()`. Con `from math import sqrt` importas solo esa función y la usas directamente como `sqrt()`.
2. Cuando la secuencia es **grande** o no necesitas todos los valores a la vez. El generador ocupa mucho menos memoria.
3. La **envuelve** y añade código antes y después de ejecutarla, sin modificar la función original.

</details>

---

## ✅ Resumen en 3 frases

- Los módulos se importan con `import`; pip instala paquetes externos desde PyPI.
- Los generadores (`yield`) crean valores sobre la marcha, ahorrando memoria.
- Los decoradores envuelven funciones para añadirles comportamiento extra.

---

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| **Módulo** | Archivo `.py` con código reutilizable |
| **pip** | Gestor de paquetes de Python |
| **PyPI** | Repositorio oficial de paquetes Python |
| **requirements.txt** | Lista de dependencias del proyecto |
| **Generador** | Función con `yield` que produce valores uno a uno |
| **yield** | Palabra clave que convierte una función en generador |
| **Decorador** | Función que envuelve a otra para añadir comportamiento |
| **@wraps** | Decorador que preserva los metadatos de la función original |

---

📚 [Volver al índice de la unidad](/ApuntesPSP/00-python-basico) · **Anterior:** [07 · Clases](/ApuntesPSP/00-python-basico/07-clases) · **Siguiente:** [09 · Cierre](/ApuntesPSP/00-python-basico/09-cierre)
