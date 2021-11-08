class Publicaciones:
    def __init__(self,url,date,category):
        self.url = url
        self.date = date
        self.category = category

    def retornar(self):
        return {
            'url': self.url,
            'date': self.date,
            'category':self.category
        }

    def retornar_url(self):
        return self.url

    def Actualizar_categoria(self,nuevocategoria): 
        self.category = nuevocategoria
