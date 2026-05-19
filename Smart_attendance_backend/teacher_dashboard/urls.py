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

]
