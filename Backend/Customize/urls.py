from django.urls import path
from . import views

urlpatterns = [
    path('add', views.addPet),
    path('delIngred', views.delIngred),
    path('delPet', views.delPet),
    path('edit', views.editPet)
]