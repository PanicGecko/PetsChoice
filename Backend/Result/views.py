from django.http import JsonResponse
import json
from tools.logging import logging_check
from user.models import *
from .models import *
from django.core.serializers import serialize
from mongoengine.queryset.visitor import Q

page_count = 5

@logging_check
def search(request):
    pass

@logging_check
def getPage(request):
    pass