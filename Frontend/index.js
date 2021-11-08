async function crear(){
    // value: Retorna el valor asociado a la etiqueta
    let correo = document.getElementById("correo").value
    let password = document.getElementById("password").value
    let nombre = document.getElementById("nombre").value
    let genero = document.getElementById("genero").value
    let nombreusuario = document.getElementById("nombre_usuario").value
    var contN = false; var contC = false;
    var numeros = "0123456789";
    var letras = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    for(i=0; i<password.length;i++){
        //Se revisa si hay algún numero en la contraseña
        if(numeros.indexOf(password.charAt(i),0)!=-1){
            contN = true;
        }
        //Se revisa si hay algún caracter especial en la contraseña
        if(letras.indexOf(password.charAt(i),0)==-1 && numeros.indexOf(password.charAt(i),0)!=-1){
            contC = true;
        }
    }
    
    if(password.length < 8 || contN == false || contC == false)
        alert("Por favor, verifique que su contraseña sea de al menos 8 caracteres, contenga un número y un símbolo");
    else{
        let peticion = await fetch("http://localhost:4000/usuario", {
        method: "put",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            correo: correo,
            password: password,
            nombre: nombre,
            genero: genero,
            Nombre_usuario: nombreusuario
            })
        })
        let respuesta = await peticion.json()
        alert(respuesta.mensaje)


        document.getElementById("correo").value = ""
        document.getElementById("password").value = ""
        document.getElementById("nombre").value = ""
        document.getElementById("genero").value = ""
        document.getElementById("nombre_usuario").value = ""

        contN = contC = false;
        window.location.href = "IniciarSesion.html"
    }
    
}

async function ini(){
    // value: Retorna el valor asociado a la 
    let nombreusuario = document.getElementById("nombre_usuario1").value
    let password = document.getElementById("password1").value


    let peticion = await fetch("http://localhost:4000/login", {
        method: "post",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            Nombre_usuario: nombreusuario,
            password: password           
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.Estado)

    if(respuesta.Estado == "ok"){
        if(nombreusuario=="admin"){
            window.location.href = "ModuloAdmin.html"
            
        }
        if(nombreusuario!="admin"){
            window.location.href = "ModuloUsuario.html"
            localStorage.setItem('us', nombreusuario);
        }
    }

    document.getElementById("nombre_usuario").value = ""
    document.getElementById("password").value = ""
}

async function cargaMasiva(){
    let archivo = document.getElementById('inputCM').files[0]
    console.log(archivo)

    const reader = new FileReader()

    reader.addEventListener("load", (event) => {
        console.log(event.target.result)
        enviarInfo(JSON.parse(event.target.result))
    })

    reader.readAsText(archivo, "UTF-8")
}

async function enviarInfo(jsonCM){
    console.log(jsonCM)
    const rawResponse = await fetch("http://localhost:4000/usuarios/carga-masiva", {
        method: "POST",
        body: JSON.stringify({ "usuarios": jsonCM.usuarios }),
        headers: { "Content-Type": "application/json" },
    })

    console.log(rawResponse)
    const response = await rawResponse.json()
    console.log(response)
}

async function crearAdmin(){
    // value: Retorna el valor asociado a la etiqueta
    let correo = "admin@ipc1.com"
    let password = "admin@ipc1"
    let nombre = "Javier Alejandro Lopez"
    let genero = "m"
    let nombreusuario = "admin"

    
    let peticion = await fetch("http://localhost:4000/usuario", {
    method: "put",
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({
        correo: correo,
        password: password,
        nombre: nombre,
        genero: genero,
        Nombre_usuario: nombreusuario
        })
    })
    
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)
}
