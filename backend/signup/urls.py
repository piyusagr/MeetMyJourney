from django.urls import path
from .views import create_interview, UserCreateView, CompanyListCreateView, verify, user_login

urlpatterns = [
    path('api/register/', UserCreateView.as_view(), name="user-register"),
    path('api/companies/', CompanyListCreateView.as_view(), name='company-list-create'),
    path('api/login/', user_login, name='user_login'),
    path('api/companies/<str:company_name>/interviews/',create_interview, name="interview-experience"),
    path('api/verify/', verify, name='verify-email'),

]
