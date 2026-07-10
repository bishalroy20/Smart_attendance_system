from django.contrib import admin
from .models import User
from django.utils.html import format_html
from .models import TrainingImage


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "role", "uid")
    search_fields = ("name", "email", "uid")
    list_filter = ("role", "semester", "department")



@admin.register(TrainingImage)
class TrainingImageAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "thumbnail", "uploaded_at", "batch_id")
    list_filter = ("user", "batch_id", "uploaded_at")
    search_fields = ("user__name", "image_url")

    def thumbnail(self, obj):
        if obj.image_url:
            return format_html('<img src="{}" width="80" height="80" style="object-fit:cover; border-radius:6px;" />', obj.image_url)
        return "No Image"
    thumbnail.short_description = "Preview"
