from django.shortcuts import render
from rest_framework import generics
from .models import User, Company
from .serializers import UserSerializer, CompanySerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes



@permission_classes([AllowAny])
class UserCreateView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer


@permission_classes([AllowAny])
class CompanyListCreateView(generics.ListCreateAPIView):

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    print(Company.logo)