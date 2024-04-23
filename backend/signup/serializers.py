from rest_framework import serializers
from .models import Interview, User, Company, MockInterview

class MockInterviewSerializer(serializers.ModelSerializer):
  class Meta:
      model = MockInterview
      fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'verification_token', 'is_verified']
        extra_kwargs = {'password': {'write_only': True}}

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = '__all__'
