
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

@api_view(['GET'])
def get_user_profile(request, uid):
    try:
        # ✅ uid ফিল্ড দিয়ে খুঁজবে
        user = User.objects.get(uid=uid)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


@api_view(['POST'])
def register_user(request):
    data = request.data.copy()
    if "uid" in data:
        data["firebase_uid"] = data["uid"]
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login_user(request):
    email = request.data.get("email")
    try:
        user = User.objects.get(email=email)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)



# 🔥 UPDATE USER PROFILE
@api_view(['PUT', 'PATCH'])
def update_user_profile(request, uid):
    try:
        user = User.objects.get(uid=uid)

        serializer = UserSerializer(
            user,
            data=request.data,
            partial=True  # allow partial update
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)