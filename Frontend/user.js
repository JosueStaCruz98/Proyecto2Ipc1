var userm
function mostrar(valor) {
    /*
        document: hace referencia a la pagina web cargada en el navegador
        getElementById(): obtiene el elemento html asociado al id que le pasemos por parametro
        style: accede a la propiedad style de la etiqueta html obtenida y modifica cualquier propiedad 
        perteneciente a este atributo, style es refernte al css de esa etiqueta
    */
    

    if (valor == 1) { document.getElementById("editar").style.display = "";
                        userm = localStorage.getItem('us')
                        Buscar();
                     }
    else { document.getElementById("editar").style.display = "none"; }
    
    if (valor == 2) { document.getElementById("publicar").style.display = ""; }
    else { document.getElementById("publicar").style.display = "none"; }

}
//Función que permite buscar los datos del usuario y despues mostrarlos en los cuadros de texto
async function Buscar(){
    let peticion = await fetch("http://34.125.72.234:4000/buscar_usuario", {
        method: "post",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            Nombre_usuario: userm
        })
    })
    let respuesta = await peticion.json()
    respuesta = respuesta.Data_User
    console.log(respuesta.nombre_usuario)


    document.getElementById("correo_edit").value = respuesta.correo
    document.getElementById("password_edit").value = respuesta.password
    document.getElementById("nombre_edit").value = respuesta.nombre
    document.getElementById("genero_edit").value = respuesta.genero
}
//Función que permite editar al usuario
async function editar() {

    let correo = document.getElementById("correo_edit").value
    let password = document.getElementById("password_edit").value
    let nombre = document.getElementById("nombre_edit").value
    let genero = document.getElementById("genero_edit").value

    let peticion = await fetch("http://34.125.72.234:4000/actualizar" , {
        method: "post",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            correo: correo,
            password: password,
            nombre: nombre,
            Genero: genero,
            Nombre_usuario: userm
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)

    document.getElementById("correo_edit").value = ""
    document.getElementById("password_edit").value = ""
    document.getElementById("nombre_edit").value = ""
    document.getElementById("genero_edit").value =""
}

function cerrar() {
    alert("Usted ha cerrado sesión");
     window.location.href = "Home.html"
}