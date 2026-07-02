# student_dashboard/urls.py

from django.urls import path

from . import views

urlpatterns = [

    path(
        "classes/",
        views.student_classes,
        name="student_classes"
    ),

    path(
        "give-attendance/",
        views.give_attendance,
        name="give_attendance"
    ),
    path('attendance-history/', views.attendance_history, name='attendance_history'),
    path("attendance-summary/", views.attendance_summary, name="attendance_summary"),
    path("promote-semester/", views.promote_semester, name="promote_semester"),
]