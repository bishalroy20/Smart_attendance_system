# student_dashboard/admin.py

from django.contrib import admin

from .models import Attendance


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):

    list_display = (
        "student",
        "attended_class",
        "created_at",
    )

    search_fields = (
        "student__username",
        "attended_class__course_name",
    )

    list_filter = (
        "created_at",
    )