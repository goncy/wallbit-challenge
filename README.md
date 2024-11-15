
![Logo](https://wallbit.io/assets/logo-wallbit-fe8a4ef0.svg)

# Wallbit Junior Frontend Challenge

Solución del desafío de Wallbit Junior Frontend Challenge, en la cual se crea un carrito de compras. A continuación, se detallan las características implementadas y los pasos para correr el proyecto.
## Instalación

1. Clona el repositorio:

    ````
    git clone https://github.com/EstebanSL/wallbit-challenge.git
    ````

2. Ingresa a la carpeta del proyecto
    ````
    cd Cart-App
    ````

3. Instala las dependencias
    ````
    npm install
    ````

3. Ejecutar el proyecto
    ````
    npm run dev
    ````
    
## Tech Stack

**React**: Biblioteca de JavaScript para construir interfaces de usuario.

**Zustand**: Biblioteca de administración de estado global para React.

**react-hook-form**: Biblioteca para manejo de formularios en React.

**Radix UI**: Componentes accesibles de UI para React.

**Lucide React**: Íconos en SVG listos para React.

**react-hot-toast**: Notificaciones para React.

**tailwindcss**: Framework de CSS para diseño rápido y responsivo.

**TypeScript**: Superset de JavaScript que añade tipado estático.


## Features

**Agregar productos al carrito**: Permite a los usuarios ingresar el ID de un producto y la cantidad deseada para añadirlo al carrito.

**Gestión de errores**: Los errores provenientes de la API son gestionados y se muestran mensajes informativos al usuario.

**Visualización de productos en el carrito**: Muestra una tabla con los productos añadidos al carrito, incluyendo:
- Nombre del producto
- Precio
- Imagen
- Cantidad seleccionada por el usuario

**Persistencia del carrito**: El contenido del carrito se mantiene al recargar la página.

**Cantidad total de productos**: Se muestra la cantidad total de productos añadidos al carrito.

**Costo total del carrito**: Calcula y muestra el costo total de todos los productos en el carrito.

**Fecha de creación del carrito**: Se guarda la fecha en la que se guardo el primer elemento en el carrito, esta tambien persiste y es reiniciada si es es vaciado

**Modo claro/oscuro**: La aplicación cuenta con un modo de visualización que permite a los usuarios alternar entre los modos claro y oscuro de acuerdo a sus preferencias o condiciones de iluminación.
## Demo

https://wallbit-challenge-solution.vercel.app

