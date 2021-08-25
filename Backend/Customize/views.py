from django.http import JsonResponse
import json
from tools.logging import logging_check
from user.models import *

@logging_check
def addPet(request):
    if request.method == 'POST':
        user = request.myuser
        jsonStr = json.loads(request.body)
        try: 
            newPet = Pet(name=jsonStr['name'],ingreds=jsonStr['ingreds'],link=[])
            user.pets.append(newPet)
            user.save()
        except Exception as e:
            return JsonResponse({'code': 403, 'msg': 'Insert gone wrong'})
        return JsonResponse({'code': 200, 'msg': 'Pet added'})

@logging_check
def delIngred(request):
    if request.method == 'POST':
        user = request.myuser
        jsonStr = json.loads(request.body)
        try:
            theLevel = user.pets[jsonStr['selection']].ingreds.pop(jsonStr['index'], None)
            if len(user.pets[jsonStr['selection']].link) != 0:
                user.pets[jsonStr['selection']].updated = False
            user.save()
        except Exception as e:
            return JsonResponse({'code': 403, 'msg': 'Deletion gone wrong'})
        return JsonResponse({'code': 200, 'msg': 'Deletion all good'})

@logging_check
def delPet(request):
    if request.method == 'POST':
        user = request.myuser
        jsonStr = json.loads(request.body)
        try: 
            del user.pets[jsonStr['selection']]
            user.save()
        except Exception as e:
            return JsonResponse({'code': 400, 'msg': 'Deletion gone wrong'})
        return JsonResponse({'code': 200, 'msg': 'Deletion all good'})

@logging_check
def editPet(request):
    if request.method == 'POST':
        user = request.myuser
        jsonStr = json.loads(request.body)
        try:
            user.pets[jsonStr['selection']].name = jsonStr['name']
            user.pets[jsonStr['selection']].ingreds = jsonStr['ingreds']
            if user.pets[jsonStr['selection']].updated == True and len(user.pets[jsonStr['selection']].link) > 0:
                user.pets[jsonStr['selection']].updated = False
            user.save()
        except Exception as e:
            return JsonResponse({'code': 400, 'msg': 'Edit gone wrong'})
        return JsonResponse({'code': 200, 'msg': 'Edit all good'})