from django.db import models
from authentication.models import User
from teacher_dashboard.models import Class

class Attendance(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    attended_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    # image_url = models.URLField()   # ✅ শুধু link save হবে
    image_url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.name} - {self.attended_class.course_name}"



