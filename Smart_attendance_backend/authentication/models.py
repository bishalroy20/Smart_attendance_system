from django.db import models
import uuid
from django.db import models

class User(models.Model):
    uid = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    regId = models.CharField(max_length=50, blank=True, null=True)
    semester = models.CharField(max_length=20, blank=True, null=True)
    empId = models.CharField(max_length=50, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=20, default="student")
    avatarUrl = models.URLField(blank=True, null=True)
    firebase_uid = models.CharField(max_length=255, unique=True, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.role})"
    






class TrainingImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="training_images")
    image_url = models.URLField()  # ImgBB URL save হবে
    uploaded_at = models.DateTimeField(auto_now_add=True)

    # ✅ batch_id auto-generate হবে
    batch_id = models.UUIDField(default=uuid.uuid4, editable=False)

    class Meta:
        unique_together = ("user", "image_url")

    def __str__(self):
        return f"{self.user.name} - {self.batch_id}"

