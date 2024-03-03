
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    verification_token = models.CharField(max_length=100, null=True, blank=True)
    is_verified = models.BooleanField(default=False)

class Company(models.Model):
    name = models.CharField(unique=True, max_length=255)
    description = models.TextField(null=True, blank=True)
    logo = models.URLField(null=True, blank=True)

class InterviewExperience(models.Model):
    companyName = models.CharField(max_length=255, default="")
    profile_name = models.CharField(max_length=255)
    application = models.TextField()
    interview_process = models.TextField()
    interview_questions = models.TextField()
    offer = models.BooleanField(default=False)
    easy = models.BooleanField(default=False)
    medium = models.BooleanField(default=False)
    hard = models.BooleanField(default=False)

   
   