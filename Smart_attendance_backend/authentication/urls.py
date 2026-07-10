from django.urls import path
from .views import register_user, login_user, get_user_profile ,update_user_profile ,upload_training_images ,get_user_training_images

urlpatterns = [
    path('auth/register', register_user),
    path('auth/login', login_user),
    path('users/<str:uid>/', get_user_profile),   # ✅ AuthProvider.jsx এর জন্য
    path("users/<str:uid>/update/", update_user_profile),

    path("upload-training-images/", upload_training_images, name="upload_training_images"),
    path("get-user-training-images/", get_user_training_images, name="get_user_training_images"),
]