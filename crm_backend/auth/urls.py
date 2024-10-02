# auth/urls.py
from django.urls import path
from .views import RegisterView, LoginView, get_current_user

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('current-user/', get_current_user, name='current-user'),
]