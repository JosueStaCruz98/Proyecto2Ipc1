function mostrar(valor) {
    /*
        document: hace referencia a la pagina web cargada en el navegador
        getElementById(): obtiene el elemento html asociado al id que le pasemos por parametro
        style: accede a la propiedad style de la etiqueta html obtenida y modifica cualquier propiedad 
        perteneciente a este atributo, style es refernte al css de esa etiqueta
    */
    
    if (valor == 1) { document.getElementById("carga").style.display = ""; }
    else { document.getElementById("carga").style.display = "none"; }
    
    if (valor == 2) {
        mostrarContactos();
        document.getElementById("mostrar").style.display = "";
     }
    else {
         document.getElementById("mostrar").style.display = "none";
         }
    if (valor == 3) { document.getElementById("mod").style.display = ""; }
    else { document.getElementById("mod").style.display = "none"; }

}

async function mostrarContactos() {
    let cuerpo = document.getElementById("tbody")
     //innerHTML: modifica el contenido que se encuentra como hijo de la etiqueta especificada
    cuerpo.innerHTML = "";

    let peticion = await fetch("http://34.125.72.234:4000/devolver_todo")
    let respuesta = await peticion.json()
    console.log(respuesta)
    respuesta = respuesta.Data_User
    for (let i = 0; i < respuesta.length; i++){
        console.log(respuesta[i].nombre_usuario)
        // createElement(): crea una etiqueta del tipo que es pasado por parametro
        let tr = document.createElement("tr")
        let th = document.createElement("th")
        th.scope = "row" // scope: especifica que esa etiqueta es la cabecera, en este caso de la fila
        th.innerHTML = i + 1
        tr.appendChild(th) //appendChild(): agrega un nuevo hijo a la etiqueta especificada

        let td = document.createElement("td")
        td.innerHTML = respuesta[i].nombre
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].nombre_usuario
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].correo
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].genero
        tr.appendChild(td)

        cuerpo.appendChild(tr);
    }    
}

async function Buscar(){
    let nombreusuario = document.getElementById("n_usuario1").value

    let peticion = await fetch("http://34.125.72.234:4000/buscar_usuario", {
        method: "post",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            Nombre_usuario: nombreusuario
        })
    })
    let respuesta = await peticion.json()
    respuesta = respuesta.Data_User
    console.log(respuesta.nombre_usuario)


    document.getElementById("correo_2").value = respuesta.correo
    document.getElementById("password_2").value = respuesta.password
    document.getElementById("nombre_2").value = respuesta.nombre
    document.getElementById("genero_2").value = respuesta.genero
}

async function eliminar() {
    let nombreusuario = document.getElementById("n_usuario1").value

    let peticion = await fetch("http://34.125.72.234:4000/deleteuser", {
        method: "delete",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            Nombre_usuario: nombreusuario
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.Estado)
    document.getElementById("n_usuario1").value = ""
    document.getElementById("correo_2").value = ""
    document.getElementById("password_2").value = ""
    document.getElementById("nombre_2").value = ""
    document.getElementById("genero_2").value =""
}

function cerrar() {
    alert("Usted ha cerrado sesión");
     window.location.href = "Home.html"
}

async function editar() {
    let nombreusuario = document.getElementById("n_usuario1").value
    let correo = document.getElementById("correo_2").value
    let password = document.getElementById("password_2").value
    let nombre = document.getElementById("nombre_2").value
    let genero = document.getElementById("genero_2").value

    let peticion = await fetch("http://34.125.72.234:4000/actualizar" , {
        method: "post",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            correo: correo,
            password: password,
            nombre: nombre,
            Genero: genero,
            Nombre_usuario: nombreusuario
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)

    document.getElementById("n_usuario1").value
    document.getElementById("correo_2").value = ""
    document.getElementById("password_2").value = ""
    document.getElementById("nombre_2").value = ""
    document.getElementById("genero_2").value =""
}