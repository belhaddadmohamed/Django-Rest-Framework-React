from django.shortcuts import render
from .models import User, Profile

from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class register(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer



@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'GET': '/api/profiles/'},
        {'POST': '/api/token/'},
        {'POST': '/api/token/refresh'},
    ]

    return Response(routes)




