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
