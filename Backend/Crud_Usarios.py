from Usuario import Usuario

class Crud_Users:

    def __init__(self):
        self.arreglo_user = []

    def Crear_User(self,correo,password,nombre,nombre_usuario,genero):
        id = len(self.arreglo_user)
        nuevo = Usuario(id, correo, password, nombre, genero, nombre_usuario)
        
        self.arreglo_user.append(nuevo)
        return id
    
    def Leer_un_usuario(self,nombre_usuario):
        for search_user in self.arreglo_user:
            if search_user.nombre_usuario == nombre_usuario:
                return search_user.retornar()

    def Read_all_users(self):
        all_users = []
        for user in self.arreglo_user:
            all_users.append(user.retornar())
        return all_users

    # Actualizar usuario
    def updateUser(self, correo, pwd, nombre,nombre_usuario,genero):
        for usuario in self.arreglo_user:
            if usuario.nombre_usuario == nombre_usuario:
                usuario.correo = correo
                usuario.password = pwd
                usuario.nombre = nombre
                usuario.nombre_usuario = nombre_usuario
                usuario.genero = genero
                return usuario.retornar()
        return None

    def deleteUsuario(self, nombre_usuario):
        for usuario in self.arreglo_user:
            if usuario.nombre_usuario == nombre_usuario:
                self.arreglo_user.remove(usuario)
                return "Eliminado"
        return "No se pudo eliminar"

    # Login
    def login(self, nombre_usuario, pwd):
        if nombre_usuario == "admin" and pwd == "admin@ipc1":
            return "ok"
        else: 
            for usuario in self.arreglo_user:
                if usuario.nombre_usuario == nombre_usuario and usuario.password == pwd:
                    return "ok"
                else:
                    return "No"

    #Carga masiva
    def cargaMasiva(self, usuarios_cm):
        for usuario_cm in usuarios_cm:
            self.Crear_User(usuario_cm['correo'], usuario_cm['password'], usuario_cm['nombre'], usuario_cm['genero'], usuario_cm['nombre_usuario'])
        return "OK"

    
