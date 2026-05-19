# teacher_dashboard/admin.py

from django.contrib import admin
from .models import Class


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):

    list_display = (
        "course_name",
        "course_code",
        "semester",
        "teacher",
        "date",
    )

    search_fields = (
        "course_name",
        "course_code",
    )

    list_filter = (
        "semester",
        "date",
    )