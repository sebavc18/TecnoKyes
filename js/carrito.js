// Arreglo para almacenar los productos en el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contador = carrito.length;
    document.getElementById("carrito-count").textContent = contador;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    // Crear un objeto de producto
    const producto = {
        nombre: nombre,
        precio: parseFloat(precio), // Asegúrate de convertir el precio a número
        imagen: imagen
    };

    // Agregar el producto al carrito
    carrito.push(producto);

    // Actualizar el contador en el icono del carrito
    actualizarContadorCarrito();

    // Actualizar la vista del carrito
    actualizarVistaCarrito();

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(indice) {
    // Eliminar el producto en la posición 'indice'
    carrito.splice(indice, 1);

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la vista y el contador del carrito
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}

// Función para actualizar la vista del carrito (mostrar productos agregados)
function actualizarVistaCarrito() {
    const carritoContenedor = document.getElementById("productos-carrito");
    carritoContenedor.innerHTML = ""; // Limpiar el contenedor de productos del carrito

    // Mostrar los productos en el carrito
    carrito.forEach((producto, indice) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("carrito-producto");
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-producto-imagen" />
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio}</p>
            <button class="eliminar-producto" data-indice="${indice}">X</button>
        `;

        // Agregar el producto a la vista del carrito
        carritoContenedor.appendChild(productoDiv);
    });

    // Mostrar el carrito si tiene productos
    const carritoContenedorDisplay = document.getElementById("carrito-contenedor");
    carritoContenedorDisplay.style.display = carrito.length > 0 ? "block" : "none";

    // Agregar el evento para el botón de eliminar
    document.querySelectorAll('.eliminar-producto').forEach(boton => {
        boton.addEventListener('click', function(event) {
            // Detener la propagación del clic para que no cierre el carrito
            event.stopPropagation();

            const indice = boton.getAttribute('data-indice');
            eliminarDelCarrito(indice);
        });
    });

    // Agregar un botón para finalizar compra si hay productos en el carrito
    const finalizarCompraBtn = document.getElementById("finalizar-compra");
    if (carrito.length > 0) {
        finalizarCompraBtn.style.display = "block";
    } else {
        finalizarCompraBtn.style.display = "none";
    }
}

// Función para cargar el carrito desde localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
    // Ya cargamos el carrito al principio, pero es útil llamarlo aquí para asegurarnos de que se muestra al inicio
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}

// Asignar el evento a los botones de "Agregar al carrito"
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', function() {
        // Obtener el nombre, precio e imagen del producto desde los atributos del botón
        const nombreProducto = boton.getAttribute('data-nombre');
        const precioProducto = boton.getAttribute('data-precio');
        const imagenProducto = boton.getAttribute('data-imagen');

        // Llamar a la función para agregar el producto al carrito
        agregarAlCarrito(nombreProducto, precioProducto, imagenProducto);
    });
});

// Mostrar u ocultar el carrito desplegable al hacer clic en el icono
document.getElementById("carrito-icono").addEventListener("click", () => {
    const carritoContenedorDisplay = document.getElementById("carrito-contenedor");
    carritoContenedorDisplay.style.display = (carritoContenedorDisplay.style.display === "none") ? "block" : "none";
});

// Llamar a la función que carga el carrito desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);

// Función para finalizar la compra (puedes personalizarla)
function finalizarCompra() {
    if (carrito.length > 0) {
        alert("Compra finalizada con éxito. ¡Gracias por tu compra!");
        // Limpiar el carrito después de la compra
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito();
        actualizarContadorCarrito();
    } else {
        alert("No tienes productos en el carrito.");
    }
}

// Asignar el evento para finalizar la compra
document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);
