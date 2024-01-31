from django.shortcuts import render
from .serializers import UserSerializer, ProfileSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view



@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'POST': '/api/token/'},
        {'POST': '/api/token/refresh'},
    ]

    return Response(routes)

    

# @api_view(['POST'])
# def register(request):


#     return Response()

