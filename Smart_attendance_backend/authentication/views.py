
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

from rest_framework.parsers import MultiPartParser, FormParser
from .models import TrainingImage
from .serializers import TrainingImageSerializer
from rest_framework.decorators import api_view, parser_classes
from rest_framework import status
import uuid
from rest_framework import status
from .models import TrainingImage
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import TrainingImage
from authentication.models import User
from .serializers import TrainingImageSerializer



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



# # # 🔥 UPDATE USER PROFILE
# @api_view(['PUT', 'PATCH'])
# def update_user_profile(request, uid):
#     try:
#         user = User.objects.get(uid=uid)

#         serializer = UserSerializer(
#             user,
#             data=request.data,
#             partial=True  # allow partial update
#         )

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)

#         return Response(serializer.errors, status=400)

#     except User.DoesNotExist:
#         return Response({"error": "User not found"}, status=404)
    


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

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

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)




@api_view(['POST'])
def upload_training_images(request):
    firebase_uid = request.data.get("firebase_uid")
    try:
        user = User.objects.get(firebase_uid=firebase_uid)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    image_urls = request.data.get("image_urls", [])
    if not image_urls or len(image_urls) < 5:
        return Response({"error": "Minimum 5 images required"}, status=400)

    # ✅ একবার batch_id generate করো
    batch_id = uuid.uuid4()

    saved = []
    for url in image_urls:
        training_img = TrainingImage.objects.create(user=user, image_url=url, batch_id=batch_id)
        saved.append(training_img)

    return Response({"batch_id": str(batch_id), "images": [img.image_url for img in saved]}, status=201)




@api_view(['GET'])
def get_user_training_images(request):
    firebase_uid = request.query_params.get("firebase_uid")
    if not firebase_uid:
        return Response({"error": "firebase_uid is required"}, status=400)

    try:
        user = User.objects.get(firebase_uid=firebase_uid)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    images = TrainingImage.objects.filter(user=user)
    serializer = TrainingImageSerializer(images, many=True)
    return Response(serializer.data, status=200)
