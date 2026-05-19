from django.db import models
from authentication.models import User


class Class(models.Model):

    course_name = models.CharField(
        max_length=100
    )

    course_code = models.CharField(
        max_length=20,
        unique=True
    )

    semester = models.CharField(
        max_length=20
    )

    date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    teacher = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "teacher"},
        related_name="classes"
    )

    password = models.CharField(
        max_length=20
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"{self.course_name} ({self.course_code})"