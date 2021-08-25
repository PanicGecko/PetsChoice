from mongoengine import *
import mongoengine_goodjson as gj

# class Link(EmbeddedDocument):
#     content = StringField(max_length=100, required=True)

# class Ingred(EmbeddedDocument):
#     name = StringField(max_length=25, required=True)
#     level = IntField(max_value=3, required=True, default=1)

class Pet(gj.EmbeddedDocument):
    name = StringField(max_length=20, required=True, default='New Pet')
    # ingred = MapField(EmbeddedDocumentField(Ingred))
    ingreds = DictField()
    # link = ListField(EmbeddedDocumentField(Link))
    link = ListField()
    updated = BooleanField(default=True, required=True)

class Users(gj.Document):
    phone = StringField(max_length=14, required=True, unique=True)
    pets = ListField(EmbeddedDocumentField(Pet))


