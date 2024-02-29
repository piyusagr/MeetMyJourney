from django.urls import path
from .views import UserCreateView, CompanyListCreateView, verify_email

urlpatterns = [
    path('api/register/', UserCreateView.as_view(), name="user-register"),
    # path('api/login/', UserLogin.as_view(), name='user-login'),
    path('api/companies/', CompanyListCreateView.as_view(), name='company-list-create'),

    path('api/verify/<str:token>/', verify_email, name='verify-email'),

]
