from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid

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

class Interview(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    profile_name = models.CharField(max_length=255)
    application = models.TextField()
    interview_process = models.TextField()
    interview_question = models.TextField()
    offer = models.BooleanField(default=False)
    easy = models.BooleanField(default=False)
    medium = models.BooleanField(default=False)
    hard = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.profile_name} - {self.company.name}"


class MockInterview(models.Model):
    name = models.CharField(max_length=255)
    resume = models.FileField(null=True,upload_to='resumes/')
    date = models.DateField()
    time = models.TimeField()
    google_meet_link = models.CharField(null=True, max_length=255, unique=True)

    def save(self, *args, **kwargs):
        if not self.google_meet_link:
            meeting_id = str(uuid.uuid4())
            self.google_meet_link = f'https://meet.google.com/{meeting_id}'
        super().save(*args, **kwargs)

