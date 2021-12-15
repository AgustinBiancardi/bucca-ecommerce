login.logearse.addEventListener('click', logearse) 

function logearse(){
    event.preventDefault()
    const usuario = login.usuario.value;
    const contraseña = login.contraseña.value;

    let usuariosLogeados = obtenerDatosDelLocalStorage();
    let respuesta = encontrarUsuario(usuariosLogeados,usuario,contraseña);
    if(respuesta !== ''){
        alert(respuesta)
    }
   
}

function obtenerDatosDelLocalStorage(){
    let usuariosGuardados = JSON.parse(localStorage.getItem('arrayDePersonas'))
    return usuariosGuardados
}

function encontrarUsuario(usuariosLogeados,usuario,contraseña){

    for(let i =0;i<usuariosLogeados.length;i++){
        if(usuariosLogeados[i].usuario === usuario && usuariosLogeados[i].contraseña === contraseña){
            window.location.href = "index.html"
            return ''
        }
    }
    return 'ingresaste mal los datos'    
}
