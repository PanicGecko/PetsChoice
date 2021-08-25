from mongoengine import *
import mongoengine_goodjson as gj

class dogfood(gj.Document):
    image =  StringField()
    name = StringField()
    made = StringField()
    price = StringField()
    url = StringField()
    ingred = ListField()   


