from django.http import JsonResponse
from django.conf import settings
import jwt
from user.models import Users

# ADD QUERY TRY
def logging_check(func):
    def wrap(request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')
        if not token:
            print('in loggin_check token: ', token)
            return JsonResponse({'code': 300, 'msg': 'not authorized'})
        print('in logging_check token: ', token)
        try:
            res = jwt.decode(token, settings.JWT_TOKEN_KEY)
            request.myuser = Users.objects(phone=res['username'])[0]
        except Exception as e:
            return JsonResponse({'code': 300, 'msg': 'not authorized'})
        return func(request, *args, **kwargs)
    return wrap
