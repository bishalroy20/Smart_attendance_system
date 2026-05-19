from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from authentication.models import User as AppUser
from firebase_admin import auth as firebase_auth

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        if not auth_header.startswith("Bearer "):
            raise exceptions.AuthenticationFailed("Invalid Authorization header format")

        token = auth_header.split("Bearer ")[1].strip()

        try:
            decoded_token = firebase_auth.verify_id_token(token)
            firebase_uid = decoded_token["uid"]
        except Exception as e:
            print("Token verify error:", e)  # ✅ Debugging
            raise exceptions.AuthenticationFailed("Invalid Firebase token")

        try:
            # ✅ এখন uid ফিল্ডে খুঁজবে
            user = AppUser.objects.get(uid=firebase_uid)
        except AppUser.DoesNotExist:
            raise exceptions.AuthenticationFailed("User not found")

        return (user, None)
