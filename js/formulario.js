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
