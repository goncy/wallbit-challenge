let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const fechaInicio = localStorage.getItem("fechaInicio") || new Date().toLocaleString();
localStorage.setItem("fechaInicio", fechaInicio);

document.getElementById("fecha-inicio").textContent = fechaInicio;

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function agregarProducto() {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const productoId = document.getElementById("producto-id").value;
    
    if (cantidad > 0 && productoId) {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${productoId}`);
            const producto = await res.json();
            
            if (producto && producto.id) {
                const productoExistente = carrito.find(item => item.id === producto.id);
                
                if (productoExistente) {
                    productoExistente.cantidad += cantidad;
                    productoExistente.precioTotal = productoExistente.cantidad * productoExistente.precio;
                } else {
                    carrito.push({
                        id: producto.id,
                        nombre: producto.title,
                        precio: producto.price,
                        cantidad: cantidad,
                        precioTotal: cantidad * producto.price,
                        imagen: producto.image
                    });
                }

                guardarCarrito();
                mostrarCarrito();
            } else {
                alert("Producto no encontrado.");
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    }
}

function mostrarCarrito() {
    const tabla = document.getElementById("tabla-carrito");
    const contenidoCarrito = document.getElementById("contenido-carrito");
    const cartEmptyMessage = document.querySelector(".cart-empty");
    const resumenCarrito = document.getElementById("resumen-carrito");

    contenidoCarrito.innerHTML = ''; 

    let totalProductos = 0;
    let costoTotal = 0;

    carrito.forEach(item => {
        totalProductos += item.cantidad;
        costoTotal += item.precioTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.cantidad}</td>
            <td>${item.nombre}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>$${item.precioTotal.toFixed(2)}</td>
            <td><img src="${item.imagen}" alt="${item.nombre}"></td>
        `;
        contenidoCarrito.appendChild(row);
    });

    document.getElementById("total-productos").textContent = totalProductos;
    document.getElementById("costo-total").textContent = costoTotal.toFixed(2);

    cartEmptyMessage.style.display = carrito.length > 0 ? "none" : "block";
    tabla.style.display = carrito.length > 0 ? "table" : "none";
    resumenCarrito.style.display = carrito.length > 0 ? "block" : "none";
}

// Cargar el carrito al inicio
mostrarCarrito();