from flask import Flask, json, request, jsonify
from flask_cors import CORS
from Crud_Usarios import Crud_Users

# Inicializar flask
crud_usuarios = Crud_Users()
app = Flask(__name__)
CORS(app)

# Ruta Raiz
@app.route('/', methods=["GET"])
def Raiz():
    return jsonify({ "mensaje": "Servidor Levantado"}), 200

#  insertar un usuario
@app.route('/usuario', methods=["PUT"])
def insertarUsuario():
    # Parametros que nos envia el frontend
    correo = request.json["correo"]
    pwd = request.json["password"]
    nombre = request.json["nombre"]
    genero = request.json["genero"]
    nombre_usuario = request.json["Nombre_usuario"]
    
    resultado = crud_usuarios.Crear_User(correo, pwd, nombre,nombre_usuario,genero)
    return jsonify({"data": resultado, "mensaje": "OK"}), 200

#devolver todos los usuarios
@app.route('/devolver_todo', methods=["GET"])
def devolver_users():
    resultado = crud_usuarios.Read_all_users()
    return jsonify({"Data_User": resultado, "mensaje": "OK"}), 200

# Buscar un usuario por correo y devolver su informacion
@app.route('/buscar_usuario', methods=["POST"])
def buscar_un_usuario():
    user = request.json["Nombre_usuario"]
    resultado = crud_usuarios.Leer_un_usuario(user)
    return jsonify({"Data_User": resultado, "mensaje": "OK"}), 200



# Actualizar un usuario
@app.route('/actualizar', methods=["POST"])
def metodoactualizar():
    
    correo = request.json["correo"]
    pwd = request.json["password"]
    nombre = request.json["nombre"]
    genero = request.json["Genero"]
    nombre_usuario = request.json["Nombre_usuario"]

    print('voy a actualizar el usuario ',correo)

    resultado = crud_usuarios.updateUser(correo, pwd, nombre, nombre_usuario, genero)

    return jsonify({ "mensaje": "Usuario actualizado"}), 200

# Eliminar un usuario

@app.route('/deleteuser', methods=["DELETE"])
def delete_method():

    nombre_usuario = request.json["Nombre_usuario"]
    resultado = crud_usuarios.deleteUsuario(nombre_usuario)
    return jsonify({"Estado": resultado}), 200

# Login
@app.route('/login', methods=["POST"])
def login_user():
    
    nombre_usuario = request.json["Nombre_usuario"]
    pwd = request.json["password"]
    resultado = crud_usuarios.login(nombre_usuario, pwd)
    return jsonify({"Estado": resultado}), 200


if __name__ == '__main__':
    app.run('0.0.0.0',debug=True, port=4000)

