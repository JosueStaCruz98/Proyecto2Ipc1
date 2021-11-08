class Usuario:
    def __init__(self,id,correo,password,nombre,genero,nombre_usuario):
        self.id = id
        self.correo = correo
        self.password = password
        self.nombre = nombre
        self.genero = genero
        self.nombre_usuario = nombre_usuario

    def retornar(self):
        return {
            'id': self.id,
            'correo': self.correo,
            'password':self.password,
            'nombre':self.nombre,
            'genero':self.genero,
            'nombre_usuario':self.nombre_usuario
        }

    def retornar_nombre(self):
        return self.nombre

    def Actualizar_nombre(self,nuevonombre): 
        self.nombre = nuevonombre

