from django.shortcuts import render
from rest_framework import generics
from .models import User, Company, Interview
from .serializers import UserSerializer, CompanySerializer, InterviewExperienceSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_verification_token
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt

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
        message = f'Dear {name}, \n\n Verify your email with the code : {token}\n\n using the link: http://localhost:5173/verify/{email} '
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
    


@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user_profile = User.objects.get(email=email)

        if user_profile.password==password:
            if user_profile.is_verified:
                return Response({'success': True}, status=200)
            else:
                return Response({'success': False, 'error': 'Email is not verified'}, status=403)
        else:
            return Response({'success':False, 'error': "Wrong Password"}, status=402)
    except User.DoesNotExist:
        return Response({'success': False, 'error': 'Invalid email'}, status=400)


@permission_classes([AllowAny])
class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    print(Company.logo)

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

# @api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@api_view(['POST'])
@csrf_exempt

def create_interview(request, company_name):
    if request.method == 'POST':

        try:
            company = Company.objects.get(name=company_name)
        except Company.DoesNotExist:
            return Response({'error': 'Company not found'}, status=404)

        data = {
            'company': company.id,
            'profile_name': request.data.get('profilename'),
            'application': request.data.get('application'),
            'interview_process': request.data.get('interview'),
            'interview_question': request.data.get('interviewquestion'),
            'offer': request.data.get('offer', False),
            'easy': request.data.get('easy', False),
            'medium': request.data.get('medium', False),
            'hard': request.data.get('hard', False),
        }

        serializer = InterviewExperienceSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    return Response({'error': 'Invalid request method'}, status=400)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def forget_password(request):
    if request.method == 'POST':
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        verification_token = generate_verification_token()
        user.verification_token = verification_token
        user.is_verified=False
        user.save()
        send_mail(
            'Password Reset',
            f"Verification code for password reset: {verification_token}",
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def new_password(request):
    if request.method=='POST':
        email=request.data.get('email')
        password=request.data.get('password')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        if user.is_verified:
            user.password=password
            user.save()
            return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)