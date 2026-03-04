// OwO -- inputs id
document.addEventListener('DOMContentLoaded', function() {
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const textAreaMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const listoParaEnviar = {
        email : '',
        asunto : '',
        mensaje : ''
    };

    // events
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    textAreaMensaje.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviar);
    btnReset.addEventListener('click', function(event) {
        event.preventDefault();
        // function para limpiar
        cleaner();
    });
    // timer que simula el envio
    function enviar(event) {
        event.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            cleaner();
            // mensaje de exito!
            const envioRealizado = document.createElement('P');
            envioRealizado.classList.add('bg-green-500','text-white','p-2','tex-center','rounded-lg','mt-10','font-bold',
                'text-sm','uppercase');
                envioRealizado.textContent = 'Mensaje enviado correctamente!';
                formulario.appendChild(envioRealizado);
                setTimeout(() => {
                    envioRealizado.remove();
                },3000);
        },3000);
    }

    function validar(event) {
        //console.log(event.target.parentElement.nextElementSibling); // esto es trash, quedo porque quiero dejar algo de junkcode
        if(event.target.value.trim() === '') {
            alerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
            listoParaEnviar[event.target.name] = '';
            comprobarNames();
            return;
        }
        else if (event.target.id === 'email' && !validarEmail(event.target.value)) {
            alerta('El email no es valido', event.target.parentElement);
            listoParaEnviar[event.target.name] = '';
            comprobarNames();
            return;
        }
        limpiarAlerta(event.target.parentElement);
        
        // validaciones listoParaEnviar
        listoParaEnviar[event.target.name] = event.target.value.trim().toLowerCase();
        
        // comprobacion listoParaEnviar
        comprobarNames();

    };
    function alerta(mensaje, referencia) {
        // limpiandoo...
        limpiarAlerta(referencia)

        // generar alerta en el HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2', 'text-center');
        
        // injectar la alerta al formulario
        referencia.appendChild(error);
    };
    // limpiar alerta segun la referencia
    function limpiarAlerta(referencia) { // dentro de una funcion puedo repetir el nombre de una variable(? algo nuevo que aprendo..
        // comprueba si ya existe una alerta
        const alertaExiste = referencia.querySelector('.bg-red-600');
        if(alertaExiste) {
            alertaExiste.remove();
        }
    };
    function validarEmail(email) {
        // expresion regular:
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // vale la pena memorizar esto? Respuesta NO!
        const resultado = regex.test(email);
        return resultado;
    };
    // comprobar names del object
    function comprobarNames() {
        if(Object.values(listoParaEnviar).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
            return;
        }   
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
    };
    function cleaner() {
        // limpieza
        listoParaEnviar.email = '';
        listoParaEnviar.asunto = '';
        listoParaEnviar.mensaje = '';
        formulario.reset();
        comprobarNames();
    };
});