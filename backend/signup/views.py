from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
# Create your views here.
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

@permission_classes([AllowAny])
class UserCreateView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
