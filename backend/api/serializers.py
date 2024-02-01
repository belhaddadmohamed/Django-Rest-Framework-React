from rest_framework import serializers
from .models import Profile, User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
        token['image'] = user.profile.image.url
        token['verified'] = user.profile.verified

        return token
    


class RegisterSerializer(serializers.ModelSerializer):
    # password/password2 are 2 additional fields for password and password_confirmation
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']


    # Validating password
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields does not match !"}
            )
            
        return attrs


    # Create new user in the database
    def create(self, valid_data):
        user = User.objects.create(
            username=valid_data['username'],
            email=valid_data['email'],
        )
        user.set_password(valid_data['password'])       # set_password() used for hashing the password and ...
        user.save()

        return user