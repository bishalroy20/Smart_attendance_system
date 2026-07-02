# teacher_dashboard/serializers.py

from rest_framework import serializers
from .models import Class,AssignedCourse
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
            'phone',
            'regId',
            "semester",
            "department",
            "role",
        ]

        
class TeacherSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [
            "id",
            "name",
            "email",
            "phone",
            "semester",
            "department",
            "role",
            'firebase_uid'
        ]


class AssignedCourseSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source="teacher.name", read_only=True)

    class Meta:
        model = AssignedCourse
        fields = [
            "id",
            "course_id",
            "course_name",
            "session",
            "semester",
            "teacher",
            "teacher_name",
        ]
