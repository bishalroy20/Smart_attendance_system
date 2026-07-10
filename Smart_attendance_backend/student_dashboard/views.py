# student_dashboard/views.py
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from teacher_dashboard.models import Class , AssignedCourse
from authentication.models import User
from .models import Attendance
from .serializers import (
    StudentClassSerializer,
    AttendanceSerializer
)
from datetime import datetime 
from django.utils import timezone
from django.db.models import Count




@api_view(['POST'])
def promote_semester(request):
    from_semester = request.data.get("from_semester")
    to_semester = request.data.get("to_semester")

    if not from_semester or not to_semester:
        return Response({"error": "Both from_semester and to_semester required"}, status=400)

    # ✅ শুধু student role এর জন্য update করো
    updated_count = User.objects.filter(role="student", semester=from_semester).update(semester=to_semester)

    return Response({"message": f"{updated_count} students promoted from {from_semester} to {to_semester} semester"})





@api_view(["GET"])
def student_classes(request):

    semester = request.GET.get(
        "semester"
    )

    today = datetime.today().date()

    classes = Class.objects.filter(
        semester=semester,
        date=today
    ).order_by("-id")

    serializer = StudentClassSerializer(
        classes,
        many=True
    )

    return Response(serializer.data)



def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    print("Client IP:", ip)   # ✅ Debug
    return ip


@api_view(['POST'])
def give_attendance(request):
    student_uid = request.data.get("firebase_uid")
    class_id = request.data.get("class_id")
    password = request.data.get("password")

    # Get class
    try:
        cls = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=404)

    # Password check
    if password != cls.password:
        return Response({"error": "Invalid attendance password"}, status=400)

    # IP check
    client_ip = get_client_ip(request) or ""
    if not client_ip.startswith("127.0.0.1"):
        return Response({"error": f"Wrong IP: {client_ip}"}, status=400)

    # Duplicate check
    today = timezone.now().date()
    if Attendance.objects.filter(student__firebase_uid=student_uid, attended_class=cls, created_at__date=today).exists():
        return Response({"error": "Attendance already submitted"}, status=400)

    # Get student 
    try:
        student = User.objects.get(firebase_uid=student_uid)
    except User.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

    # Save attendance
    Attendance.objects.create(
        student=User.objects.get(firebase_uid=student_uid),
        attended_class=cls,
        image_url=request.data.get("image_url")
    )
    return Response({"success": "Attendance submitted"})



@api_view(['POST'])
@permission_classes([])   # ✅ permission check বাদ
def attendance_history(request):
    student_uid = request.data.get("firebase_uid")
    try:
        student = User.objects.get(firebase_uid=student_uid)
    except User.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

    records = Attendance.objects.filter(student=student).select_related("attended_class").order_by("-created_at")

    data = []
    for att in records:
        cls = att.attended_class
        data.append({
            "course_name": cls.course_name,
            "course_code": cls.course_code,
            "session": cls.session,
            "semester": cls.semester,
            "date": cls.date.strftime("%Y-%m-%d"),
            "start_time": str(cls.start_time),
            "end_time": str(cls.end_time),
            "image_url": att.image_url,
            "submitted_at": att.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        })

    return Response(data)



def attendance_summary(student):
    # Student কতবার কোন course/session এ উপস্থিত ছিল
    attended_counts = Attendance.objects.filter(student=student) \
        .values("attended_class__course_name", "attended_class__course_code", "attended_class__session") \
        .annotate(attended_count=Count("id"))

    # Teacher মোট কত class নিয়েছে (course/session অনুযায়ী)
    total_counts = Class.objects.values("course_name", "course_code", "session") \
        .annotate(total_classes=Count("id"))

    return {"attended": list(attended_counts), "total": list(total_counts)}



@api_view(['POST'])
def student_courses(request):
    firebase_uid = request.data.get("firebase_uid")
    if not firebase_uid:
        return Response({"error": "firebase_uid required"}, status=400)

    try:
        student = User.objects.get(firebase_uid=firebase_uid, role="student")
    except User.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

    # ✅ regId থেকে session বের করো
    if student.regId:
        start_year = int(student.regId[:4])
        session = f"{start_year}-{str(start_year + 1)[-2:]}"
    else:
        return Response({"error": "Student regId not found"}, status=404)

    # ✅ AssignedCourse filter করো student.semester + session দিয়ে
    courses = AssignedCourse.objects.filter(
        semester=student.semester,
        session=session
    ).select_related("teacher")

    data = [
        {
            "course_id": c.course_id,
            "course_name": c.course_name,
            "session": c.session,
            "semester": c.semester,
            "teacher_name": c.teacher.name,
        }
        for c in courses
    ]
    return Response(data)
