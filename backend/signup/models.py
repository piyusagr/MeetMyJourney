
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    logo = models.URLField(null=True, blank=True)

# class CustomerUser(AbstractUser):
#     email = models.EmailField(unique=True)
