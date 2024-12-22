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

// Función para validar el formulario de contacto
function validarFormulario(evento) {
    evento.preventDefault();
    const nombreError = document.getElementById("nombre-error");
    const emailError = document.getElementById("email-error");
    const mensajeError = document.getElementById("mensaje-error");

    const campos = [
        {id: "nombre", elemento: document.getElementById("nombre"), errorId: "nombre-error", mensajeError: "Por favor ingrese su nombre."},
        {id: "email", elemento: document.getElementById("email"), errorId: "email-error", mensajeError: "Por favor ingrese un email válido."},
        {id: "mensaje", elemento: document.getElementById("mensaje"), errorId: "mensaje-error", mensajeError: "Por favor ingrese un mensaje."}
    ];

    let formularioCompleto = true;
    campos.forEach(campo => {
        const errorElement = document.getElementById(campo.errorId);
        if (campo.elemento.value.trim() === "") {
            campo.elemento.style.borderColor = "red";
            errorElement.style.display = "block";
            errorElement.innerHTML = campo.mensajeError;
            formularioCompleto = false;
        } else {
            campo.elemento.style.borderColor = "";
            errorElement.style.display = "none";
        }
    });

    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
        email.style.borderColor = "red";
        formularioCompleto = false;
        emailError.style.display = "block"; 
        emailError.innerHTML = "Ingrese un email válido"; 
    } else {
        email.style.borderColor = "";
        emailError.style.display = "none";
    }

    if (!formularioCompleto) {
        console.log("Por favor llene los campos resaltados en rojo");
    } else {
        console.log("Formulario completado");
    }
}

const formulario = document.getElementById("form");
formulario.addEventListener("submit", validarFormulario);

// Función para mostrar o ocultar la descripción ampliada de un producto
function mostrarDetalleProducto(id) {
    const detalle = document.getElementById(id);
    detalle.style.display = (detalle.style.display === "none") ? "block" : "none";
}

// Asignar el evento de clic para cada botón "Ver detalle"
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        const id = button.getAttribute('id').replace('detalle', 'detalle-producto');
        mostrarDetalleProducto(id);
    });
});

// Crear un ciclo que genere dinámicamente una lista de productos disponibles y los muestre en la consola 
const productos = [
    {producto: "Teclado mecánico", precio: "$99.99", stock: 21, imagen: "../images/teclado1.jpg"},
    {producto: "Teclado gaming", precio: "$79.99", stock: 11, imagen: "./images/teclado2.jpg"},
    {producto: "Teclado compacto", precio: "$59.99", stock: 2, imagen: "../images/teclado3.jpg"}
];

productos.forEach(function(producto) {
    console.log(`Nombre: ${producto.producto}, Precio: ${producto.precio}, Stock: ${producto.stock}`);
});

// Llamar a la función que carga el carrito desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);

