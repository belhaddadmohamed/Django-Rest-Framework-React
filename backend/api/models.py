from django.db import models
from django.contrib.auth.models import AbstractUser


# Override the User model by changing the username field
class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.TextField(null=True)
    image = models.ImageField(upload_to='avatar/', default='avatar.png')
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
