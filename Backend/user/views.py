from django.shortcuts import render
from django.http import JsonResponse
import json
from twilio.rest import Client
from django.conf import settings
from django.core.cache import cache
import random
import jwt
from .models import *
import time
from tools.logging import logging_check

client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

def login(request):
    if request.method == 'POST':
        try:
            json_str = request.body
            json_obj = json.loads(json_str)
            if not json_obj['phone']:
                return JsonResponse({'code': 401, 'msg': 'No Phone number'})
        except:
            return JsonResponse({'code': 400})
        old_code = cache.get('sms_%s'%json_obj['phone'])
        if old_code:
            cache.delete('sms_%s'%json_obj['phone'])
        code = random.randint(1000, 9999)
        cache.set('sms_%s'%json_obj['phone'], code, 120)
        message = client.messages.create(body=code, from_=settings.TWILIO_NUMBER, to=json_obj['phone'])
    return JsonResponse({'code': 200, 'msg': 'All good'})

def check_ver(request):
    if request.method == 'POST':
        try:
            json_str = request.body
            json_obj = json.loads(json_str)
            if not json_obj['phone'] and not json_obj['ver']:
                return JsonResponse({'code': 401, 'msg': 'Wrong Verification'})
        except:
            return JsonResponse({'code': 400})
        phone = json_obj['phone']
        code = cache.get('sms_%s'%phone)
        if not code:
            return JsonResponse({'code': 301, 'msg': 'Verification expired'})
        if code != json_obj['ver']:
            return JsonResponse({'code': 300, 'msg': 'Verification Wrong'})
        old_user = Users.objects(phone=phone)[0]
        if old_user:
            for a in old_user['pets']:
                a['link'] = len(a['link'])
            return JsonResponse({'code': 200, 'msg': 'All good', 'token': make_token(phone), 'results': json.loads(old_user.to_json())['pets']})
        new_user = Users(phone=phone)
        new_user.save()
        return JsonResponse({'code': 201, 'msg': 'All good', 'token': make_token(phone), 'results': []})      

@logging_check
def check_token(request):
    for a in request.myuser['pets']:
        a['link'] = len(a['link'])
    result = json.loads(request.myuser.to_json())['pets']
    return JsonResponse({'code': 200, 'results': result})

def make_token(username, expire=3600*24):
    key = settings.JWT_TOKEN_KEY
    now_t = time.time()
    payload_data = {'username':username, 'exp':now_t + expire}
    return jwt.encode(payload_data, key, algorithm='HS256').decode('utf-8')