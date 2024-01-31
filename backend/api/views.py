from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'GET': '/api/profiles/'},
        {'POST': '/api/token/'},
        {'POST': '/api/token/refresh'},
    ]

    return Response(routes)


