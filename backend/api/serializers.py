from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Profile, User

# Warning: Profile and User don't need serializer because they sent in a JWT


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['name'] = user.profile.name
        token['bio'] = user.profile.bio
        token['image'] = user.profile.image
        token['verified'] = user.profile.verified

        return token
    


