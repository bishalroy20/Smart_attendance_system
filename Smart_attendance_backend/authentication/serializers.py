# serializers.py
from rest_framework import serializers
from .models import User
from .models import TrainingImage

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        # ✅ uid থেকে firebase_uid সেট করো
        if "uid" in validated_data:
            validated_data["firebase_uid"] = validated_data["uid"]
        return super().create(validated_data)
    




from rest_framework import serializers
from .models import TrainingImage

class TrainingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingImage
        fields = ["id", "user", "image_url", "uploaded_at", "batch_id"]  # ✅ image_url ব্যবহার করো

