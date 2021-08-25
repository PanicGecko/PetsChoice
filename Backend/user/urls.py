from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login),
    path('check_ver', views.check_ver),
    path('check_login', views.check_token)
]