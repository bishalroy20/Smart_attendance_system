from django.urls import path
from .views import register_user, login_user, get_user_profile ,update_user_profile

urlpatterns = [
    path('auth/register', register_user),
    path('auth/login', login_user),
    path('users/<str:uid>/', get_user_profile),   # ✅ AuthProvider.jsx এর জন্য
    path("users/<str:uid>/update/", update_user_profile),
]