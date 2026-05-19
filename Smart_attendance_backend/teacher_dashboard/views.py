# teacher_dashboard/views.py
from authentication.models import User
from .serializers import StudentSerializer
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from authentication.firebase_authentication import FirebaseAuthentication
from authentication.serializers import UserSerializer
from .models import Class
from .serializers import (
    ClassSerializer,
    StudentSerializer
)

from authentication.models import User


@api_view(["POST"])
def create_class(request):

    try:

        user = User.objects.get(
            firebase_uid=request.data.get("firebase_uid")
        )

    except User.DoesNotExist:

        return Response(
            {"error": "User not found"},
            status=404
        )

    if user.role != "teacher":

        return Response(
            {"error": "Only teachers can create class"},
            status=403
        )

    serializer = ClassSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            teacher=user
        )

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["GET"])
def created_classes(request):

    firebase_uid = request.GET.get("firebase_uid")

    try:

        user = User.objects.get(
            firebase_uid=firebase_uid
        )

    except User.DoesNotExist:

        return Response(
            {"error": "User not found"},
            status=404
        )

    classes = Class.objects.filter(
        teacher=user
    ).order_by("-id")

    serializer = ClassSerializer(
        classes,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def see_students(request):

    students = User.objects.filter(
        role="student"
    )

    serializer = StudentSerializer(
        students,
        many=True
    )

    return Response(serializer.data)







@api_view(['GET'])
@authentication_classes([FirebaseAuthentication])
@permission_classes([IsAuthenticated])
def get_students(request):
    students = User.objects.filter(role="student")
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)
