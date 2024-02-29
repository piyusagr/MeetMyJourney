from django.shortcuts import render
from rest_framework import generics
from .models import User, Company
from .serializers import UserSerializer, CompanySerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_verification_token
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.conf import settings
from rest_framework.decorators import api_view


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
        message = f'Dear{name}, Click the following link to verify your email: http://localhost:5173/verify/{token}'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [email]

        send_mail(subject, message, from_email, recipient_list)

@api_view(['GET'])
def verify_email(request, verification_token):
    try:
        user = get_object_or_404(User, verification_token=verification_token)
        user.is_verified = True
        user.save()
        print(f"Is Verified: {user.is_verified}")
        
        return JsonResponse({'message': 'Email verification successful'})
    except Exception as e:
        print(f"Exception: {e}")
        return JsonResponse({'message': 'Email verification failed'}, status=500)

@permission_classes([AllowAny])
class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    print(Company.logo)
