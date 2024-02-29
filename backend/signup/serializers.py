from rest_framework import serializers
from .models import User, Company

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'verification_token', 'is_verified']
        extra_kwargs = {'password': {'write_only': True}}

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


