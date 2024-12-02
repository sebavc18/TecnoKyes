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

const boton = document.getElementsByClassName("button")[0];
boton.addEventListener("click", () =>{
    window.location.href = "./pages/teclado_mecanico.html"

})


const ejemplo = document.querySelector("#producto3 .button-container .button")
console.log(ejemplo)
ejemplo.addEventListener("click", ()=>{
    window.location.href = "./pages/teclado_compacto.html"
})

const ejemplo2 = document.querySelector("#producto2 .button-container .button")
console.log(ejemplo)
ejemplo2.addEventListener("click", ()=>{
    window.location.href = "./pages/teclado_gaming.html"
})