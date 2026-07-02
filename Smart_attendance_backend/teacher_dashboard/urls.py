# teacher_dashboard/urls.py

from django.urls import path
from . import views

urlpatterns = [

    path(
        "create-class/",
        views.create_class,
        name="create_class"
    ),

    path(
        "created-classes/",
        views.created_classes,
        name="created_classes"
    ),
    # path("students/", get_students, name="get_students"),
    path(
        "students/",
        views.see_students,
        name="see_students"
    ),
    path(
        "teachers/",
        views.see_teacher,
        name="see_teachers"
    ),
    path('teacher/assigned-courses/', views.get_teacher_assigned_courses, name='teacher-assigned-courses'),
    path("assign-course/", views.assign_course, name="assign-course"),
    path("assigned-courses/", views.list_assigned_courses, name="assigned-courses"),
    path('course-details/<int:assigned_course_id>/marks/', views.get_saved_marks, name='get-saved-marks'),
    path('course-details/<int:assigned_course_id>/save/', views.save_or_lock_marks, name='save-or-lock-marks'),

    path("students/<int:pk>/promote/", views.promote_to_teacher, name="promote-to-teacher"),

]
