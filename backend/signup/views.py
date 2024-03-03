from django.shortcuts import render
from rest_framework import generics
from .models import User, Company, InterviewExperience
from .serializers import UserSerializer, CompanySerializer, InterviewExperienceSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_verification_token
# from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.conf import settings
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import logging

@permission_classes([AllowAny])
class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        verification_token = generate_verification_token()

        user = serializer.instance
        user.verification_token = verification_token
        user.save()
        self.send_verification_email(user.name,user.email, verification_token)

        headers = self.get_success_headers(serializer.data)
        return Response({'message': 'User created successfully. Check your email for verification.'}, status=status.HTTP_201_CREATED, headers=headers)

    def send_verification_email(self, name,email, token):
        subject = 'Verify your email address'
        message = f'Dear{name},  Verify your email with the code: {token}'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [email]

        send_mail(subject, message, from_email, recipient_list)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify(request):
    email = request.data.get('email')
    verification_code = request.data.get('verificationcode')

    try:
        user_profile = User.objects.get(email=email, verification_token=verification_code, is_verified=False)
        
        user_profile.is_verified = True
        user_profile.save()
        return Response(status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def user_login(request):
    if request.method == 'POST':
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        user = authenticate(request, username=email, password=password)

        if user:
            if user.is_verified:
                login(request, user)
                return JsonResponse({'success': True, 'message': 'Login successful'})
            else:
                return JsonResponse({'success': False, 'message': 'Account not verified'}, status=401)
        else:
            return JsonResponse({'success': False, 'message': 'Invalid email or password'}, status=401)

    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)


@permission_classes([AllowAny])
class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    print(Company.logo)

@permission_classes([AllowAny])
class InterviewExperienceListCreateView(generics.ListCreateAPIView):
    queryset = InterviewExperience.objects.all()
    serializer_class = InterviewExperienceSerializer