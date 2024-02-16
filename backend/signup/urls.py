from django.urls import path
from .views import UserCreateView, CompanyListCreateView

urlpatterns = [
    path('api/register/', UserCreateView.as_view(), name="user-register"),
    # path('api/login/', UserLogin, name='user-login'),
    path('api/companies/', CompanyListCreateView.as_view(), name='company-list-create'),


]
