# Wallbit Junior Frontend Challenge

Esta es una solucion al requisito del cliente:
"Hacer un carrito de compras para programadores. Tiene un formulario con 2 campos: ID del producto y cantidad. Los programadores habitualmente no necesitan saber ni ver que productos comprar, sino que saben por conexiones astrales cual es el ID del producto que quieren y así los agregan a su carrito.

Cada vez que se agrega un producto, vamos a obtener el producto desde la API y lo vamos a mostrar en una tabla, junto a la cantidad que el usuario eligió."

## Tecnologías

- React 18
- TypeScript
- Material-UI (MUI)
- Vite

## Características

- Agregar productos al carrito usando sus IDs
- Mostrar información del producto incluyendo imagen, precio y cantidad
- Cálculo del precio total en tiempo real
- Manejo de errores en peticiones a la API
- Estados de carga
- Diseño responsive

## Instalación

1. Cloná el repositorio
```bash
git clone https://github.com/itscrisu/wallbit-challenge-crisu.git
cd wallbit-challenge-crisu
```

2. Instalá las dependencias
```bash
npm install
```

3. Iniciá el servidor de desarrollo
```bash
npm run dev
```

## Pendientes (EXTRAS)

- [X] El carrito se persiste al recargar la página.
- [X] Mostrar el total de productos agregados.
- [X] Mostrar el costo total del carrito.
- [X] Mostrar la fecha de creación del carrito.
 
## Otros extra

- [X] Agregar funcionalidad para eliminar items
- [X] Agregar actualizacion de cantidades
- [ ] Testing

## API

Este proyecto usa [Fake Store API](https://fakestoreapi.com/) para los datos de productos.