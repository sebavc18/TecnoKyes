// Arreglo para almacenar los productos en el carrito
let carrito = [];

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contador = carrito.length;
    document.getElementById("carrito-count").textContent = contador;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Crear un objeto de producto
    const producto = {
        nombre: nombre,
        precio: parseFloat(precio) // Asegúrate de convertir el precio a número
    };

    // Agregar el producto al carrito
    carrito.push(producto);

    // Actualizar el contador en el icono del carrito
    actualizarContadorCarrito();
}

// Asignar el evento a los botones de "Agregar al carrito"
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', function() {
        // Obtener el nombre y precio del producto desde los atributos del botón
        const nombreProducto = boton.getAttribute('data-nombre');
        const precioProducto = boton.getAttribute('data-precio');

        // Llamar a la función para agregar el producto al carrito
        agregarAlCarrito(nombreProducto, precioProducto);
    });
});


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

    let formulariocompleto = true;
    campos.forEach(campo => {
        const errorElement = document.getElementById(campo.errorId);
        if (campo.elemento.value.trim() === "") {
            campo.elemento.style.borderColor = "red";
            errorElement.style.display = "block";
            errorElement.innerHTML = campo.mensajeError;
            formulariocompleto = false;
        } else {
            campo.elemento.style.borderColor = "";
            errorElement.style.display = "none";
            
        }
    });

    const email = document.getElementById("email");
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailregex.test(email.value)) {
        email.style.borderColor = "red";
        formulariocompleto = false;
        emailError.style.display = "block"; 
        emailError.innerHTML = "Ingrese un email válido"; 
        console.log("Ingrese un email valido");
    } else {
        email.style.borderColor = "";
        emailError.style.display = "none";
    }

    if (!formulariocompleto) {
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
        // Prevenir el comportamiento predeterminado del enlace
        event.preventDefault();

        const id = button.getAttribute('id').replace('detalle', 'detalle-producto');
        mostrarDetalleProducto(id);
    });
});

// Crear un ciclo que genere dinámicamente una
// lista de productos disponibles y los muestre en la
// consola 

const productos = [
    {producto: "Teclado mecánico", precio: "$99.99", stock: 21},
    {producto: "Teclado gaming", precio: "$79.99", stock: 11},
    {producto: "Teclado compacto", precio: "$59.99", sotck: 2}
]

productos.forEach(function(producto){
    console.log(`Nombre: ${producto.producto}, Precio: ${producto.precio}, Stock: ${producto.stock}`)
})








