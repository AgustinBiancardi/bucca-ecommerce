registro.registrarse.addEventListener('click', registrarse) 

function registrarse(){
    event.preventDefault()
    const nombre = registro.nombre.value;
    const edad = registro.edad.value;
    const usuario = registro.usuario.value;
    const contraseña = registro.contraseña.value;
    
    validarDatos(nombre,edad,usuario,contraseña);
}

function validarDatos(nombre,edad,usuario,contraseña){
    const errorNombre = validarNombre(nombre);
    const errorEdad = validarEdad(edad);
    const errorUsuario = validarUsuario(usuario);
    const errorContraseña = valirdaContraseña(contraseña);

    if(errorNombre === '' && errorEdad === '' && errorUsuario === '' && errorContraseña === ''){
        let persona = new Persona(nombre,edad,usuario,contraseña)
        guardarDatos(persona); 
        resetearInputs(); 
    }

    let errores = []
    errores.push(errorNombre);
    errores.push(errorEdad);
    errores.push(errorUsuario);
    errores.push(errorContraseña);
    resetearErrores();
    mostrarErrores(errores);
}

class Persona{
    constructor(nombre,edad,usuario,contraseña){
        this.nombre = nombre,
        this.edad = edad,
        this.usuario = usuario,
        this.contraseña = contraseña
    }
}

function validarNombre(nombre){
    if(nombre.trim().length == 0){
        return 'Falta rellenar el campo nombre.'
    }
    if(!/[a-z ]$/i.test(nombre)){
        return 'El nombre no puede contener numeros.'
    }
    return ''
}

function validarEdad(edad){
    if(edad == ""){
        return 'Falta rellenar el campo edad'
    }
    if(edad < 18){
        return 'No pueden ingresar menores de 18 años.'
    }
    return ''
}

function validarUsuario(usuario){
    if(usuario.trim().length == 0){
        return 'Falta rellenar el campo usuario.'
    }
    return ''
}

function valirdaContraseña(contraseña){
    if(contraseña.trim().length == 0){
        return 'Falta rellenar el campo contraseña'
    }
    if(!/[a-z0-9]$/i.test(contraseña)){
        return 'La contraseña no puede contener caracteres especiales'
    }
    return ''
}
let $contenedor = document.getElementById('errores')
function mostrarErrores(errores){
    
    errores.forEach(error => {
        if(error){
            let $listaError = document.createElement('li');
            $listaError.innerText = error;
            $listaError.className = 'error'
            $contenedor.appendChild($listaError);
        }
    });
}

function resetearErrores(){
    let listaErrores = document.querySelectorAll('.error')
    listaErrores.forEach(error => {
        $contenedor.removeChild(error)
    }); 
}

let corroborarSiHayEspacioCreado = localStorage.getItem('arrayDePersonas');
if(!corroborarSiHayEspacioCreado){
    let array = []
    localStorage.setItem('arrayDePersonas', JSON.stringify(array));
}

function guardarDatos(persona){
    let usuariosGuardados = JSON.parse(localStorage.getItem('arrayDePersonas'))
    console.log(usuariosGuardados)
    usuariosGuardados.push(persona)
    localStorage.setItem('arrayDePersonas', JSON.stringify(usuariosGuardados));
}

function resetearInputs(){
    registro.nombre.value = ''
    registro.edad.value = ''
    registro.usuario.value = ''
    registro.contraseña.value = ''
}