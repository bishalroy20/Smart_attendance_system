from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "role", "uid")
    search_fields = ("name", "email", "uid")
    list_filter = ("role", "semester", "department")
