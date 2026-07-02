# student_dashboard/serializers.py

from rest_framework import serializers
from teacher_dashboard.models import Class
from .models import Attendance


class StudentClassSerializer(serializers.ModelSerializer):

    teacher_name = serializers.CharField(
        source="teacher.username",
        read_only=True
    )

    class Meta:

        model = Class

        fields = "__all__"



class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ["id", "student", "attended_class", "image_url", "created_at"]
        