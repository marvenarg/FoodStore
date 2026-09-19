# Food Store - Evaluación 1 (Programación 3)

Proyecto "Food Store", Evaluación 1 de Programación 3.

## 🔗 Enlace Video

[Explicación del Código](https://www.youtube.com/watch?v=GiYI6GyQKy8)

## 📖 Descripción

Aplicación desarrollada con Vite y TypeScript que permite a los usuarios navegar por un catálogo de productos, filtrar por categorías, buscar productos por nombre y gestionar un carrito de compras interactivo con persistencia de datos en `localStorage`.

## Estructura del Proyecto

```text
src/
├── data/
│   └── data.ts                # Constante PRODUCTS y función getCategories()
├── pages/
│   ├── admin/                 # Panel de administración y estilos
│   ├── auth/                  # Pantallas de login y registro
│   └── client/
│       ├── client.css         # Estilos base compartidos
│       ├── home/              # Catálogo, buscador y filtrado dinámico
│       └── cart/              # Vista, lógica y estilos específicos del carrito
├── types/
│   ├── categoria.ts           # Interfaz ICategoria
│   ├── IUser.ts               # Interfaz IUser y roles
│   ├── product.ts             # Interfaces IProduct e ICartItem
│   └── Rol.ts                 # Enumerador de roles
└── utils/
    ├── auth.ts                # Gestión de sesiones y guards
    ├── cart.ts                # Lógica pura del carrito en localStorage
    └── navigate.ts            # Mapeo y navegación centralizada
```

## ✨ Funcionalidades Implementadas

* **Catálogo Dinámico**: Renderizado modular de productos y categorías desde `src/data/data.ts`, tipado estrictamente con interfaces TypeScript (`IProduct`, `ICategoria`).
* **Resiliencia Visual**: Manejo de imágenes con evento onerror para mostrar un fallback automático ante caídas o errores de enlaces externos, junto con normalización CSS (object-fit: cover) para preservar la grilla.
* **Validaciones de Integridad**: Control de stock disponible tanto en el catálogo (deshabilita "Agregar al carrito" cuando no hay stock o el producto no está disponible) como en el carrito (tope al incrementar cantidades), exclusión de productos dados de baja (`eliminado`) del catálogo, y búsqueda insensible a acentos.
* **Búsqueda y Filtros**:
  * Buscador en tiempo real por nombre de producto con validación visual ante ausencia de coincidencias.
  * Menú lateral de categorías con opción de restablecer la vista general.
* **Carrito de Compras**:
  * Incorporación de productos desde el catálogo con actualización automática de cantidades si ya existen.
  * Persistencia completa en `localStorage` bajo la clave `"cart"`.
  * Vista dedicada con controles de incremento, decremento, eliminación por ítem, vaciado completo y cálculo automático del total acumulado.

 **Nota**: el guard de autenticación (`main.ts`) se mantiene tal como venía del TP integrador, sin modificaciones, conforme indica la consigna de esta evaluación (no se evalúa protección de rutas en esta instancia).

## 💻 Tecnologías utilizadas

* HTML5 / CSS3
* JavaScript / TypeScript (con tipado estricto e interfaces con prefijo `I`)
* Vite como entorno de desarrollo y empaquetador

## ⚙️ Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

2. Ejecutar el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
3. Acceder a la aplicación:
   
   Abre tu navegador en http://localhost:5173.
   
4. Compilar para producción (validación de TypeScript y build):
   ```bash
   pnpm build
   ```
5. Previsualizar la versión de producción:
   ```bash
   pnpm preview
   ```
  
