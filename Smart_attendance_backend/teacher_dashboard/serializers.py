# teacher_dashboard/serializers.py

from rest_framework import serializers
from .models import Class
from authentication.models import User


class ClassSerializer(serializers.ModelSerializer):

    teacher_name = serializers.CharField(
        source="teacher.username",
        read_only=True
    )

    class Meta:

        model = Class

        fields = "__all__"

        read_only_fields = [
            "teacher"
        ]


class StudentSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [
            "id",
            "name",
            "email",
            "semester",
            "department",
            "role",
        ]