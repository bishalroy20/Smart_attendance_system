# teacher_dashboard/views.py
from authentication.models import User
from .serializers import StudentSerializer , AssignedCourseSerializer
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from authentication.firebase_authentication import FirebaseAuthentication
from authentication.serializers import UserSerializer
from .models import Class
from .serializers import (
    ClassSerializer,
    StudentSerializer,
    TeacherSerializer
)
from authentication.models import User
from .models import AssignedCourse, StudentMark


@api_view(['POST'])
def update_all_semesters(request):
    semester = request.data.get("semester")
    if not semester:
        return Response({"error": "Semester not provided"}, status=400)

    # ✅ শুধু student role এর জন্য update করো
    User.objects.filter(role="student").update(semester=semester)

    return Response({"message": f"All students updated to {semester} semester"})


@api_view(['GET'])
def get_saved_marks(request, assigned_course_id):
    """
    ১. নির্দিষ্ট assigned_course_id এর আন্ডারে পূর্বে সেভ করা সব মার্কস 
    এবং লক স্ট্যাটাস ফ্রন্টএন্ডে পাঠানোর GET এপিআই।
    """
    try:
        assigned_course = AssignedCourse.objects.get(id=assigned_course_id)
    except AssignedCourse.DoesNotExist:
        return Response({"error": "Assigned Course not found."}, status=status.HTTP_404_NOT_FOUND)

    # ডাটাবেজ থেকে ওই কোর্সের সমস্ত সেভ করা মার্কস রেকর্ড তুলে আনা
    saved_marks_queryset = StudentMark.objects.filter(assigned_course=assigned_course)
    
    # কোর্স লকড কিনা তা চেক করা (যেকোনো একটা রো লকড থাকা মানেই পুরো কোর্স লকড)
    is_locked = saved_marks_queryset.filter(is_locked=True).exists()

    # ফ্রন্টএন্ডের স্টেট ফরম্যাট অনুযায়ী অবজেক্ট/ডিকশনারি তৈরি করা
    marks_data = {}
    for mark in saved_marks_queryset:
        marks_data[mark.student.id] = {
            "assignment": mark.assignment,
            "class_test_1": mark.class_test_1,  # 🎯 ফ্রন্টএন্ডের সাথে মিল রেখে কি (Key) নাম দেওয়া হয়েছে
            "class_test_2": mark.class_test_2,  # 🎯 ফ্রন্টএন্ডের সাথে মিল রেখে কি (Key) নাম দেওয়া হয়েছে
            "attendance_marks": mark.attendance_marks,
        }

    return Response({
        "is_locked": is_locked,
        "marks": marks_data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def save_or_lock_marks(request, assigned_course_id):
    """
    ২. নির্দিষ্ট assigned_course_id এর আন্ডারে শিক্ষার্থীদের মার্কস 
    ডাটাবেজে সেভ, আপডেট বা লক করার POST এপিআই।
    """
    try:
        assigned_course = AssignedCourse.objects.get(id=assigned_course_id)
    except AssignedCourse.DoesNotExist:
        return Response({"error": "Assigned Course not found."}, status=status.HTTP_404_NOT_FOUND)

    # ফ্রন্টএন্ড থেকে পাঠানো ডাটা গ্রহণ
    marks_dict = request.data.get('marks', {})
    lock_course = request.data.get('lock_course', False)

    # 🔒 সিকিউরিটি চেক: ডাটাবেজে এই কোর্সের মার্কস ইতিমধ্যে লক করা আছে কিনা
    already_locked = StudentMark.objects.filter(assigned_course=assigned_course, is_locked=True).exists()
    if already_locked:
        return Response(
            {"error": "This marksheet has been finalized and locked. Editing is strictly disabled."}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    # 🔄 লুপ চালিয়ে পাঠানো ডাটাবেজ রো তৈরি অথবা আপডেট (Update or Create) করা
    for student_id, marks in marks_dict.items():
        try:
            # স্টুডেন্ট ফিল্টার করা হচ্ছে প্রাইমারি কি (ID) দিয়ে
            student_user = User.objects.get(id=student_id, role='student')
            
            # ডাটাবেজে স্টুডেন্টের আইডি ও কোর্স আইডি ম্যাচ করলে আপডেট হবে, না থাকলে নতুন তৈরি হবে
            StudentMark.objects.update_or_create(
                assigned_course=assigned_course,
                student=student_user,
                defaults={
                    'assignment': float(marks.get('assignment') or 0.0),
                    'class_test_1': float(marks.get('ct1') or 0.0),       # 🔄 ফ্রন্টএন্ডের 'ct1' ডাটাবেজের 'class_test_1'-এ যাচ্ছে
                    'class_test_2': float(marks.get('ct2') or 0.0),       # 🔄 ফ্রন্টএন্ডের 'ct2' ডাটাবেজের 'class_test_2'-এ যাচ্ছে
                    'attendance_marks': float(marks.get('attendanceMarks') or 0.0), # 🔄 ফ্রন্টএন্ডের 'attendanceMarks'
                    'is_locked': lock_course  # লক রিকোয়েস্ট ট্রু হলে ট্রু হবে
                }
            )
        except (User.DoesNotExist, ValueError):
            continue  # কোনো ভুল ডাটা বা অনুপস্থিত আইডি থাকলে সেটি স্কিপ করে পরেরটাতে যাবে

    if lock_course:
        return Response({"message": "Marksheet verified and archived successfully!"}, status=status.HTTP_200_OK)
        
    return Response({"message": "Marksheet progress updated successfully!"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def assign_course(request):
    data = request.data

    # Check if this course_id + session already exists
    existing = AssignedCourse.objects.filter(
        course_id=data.get("course_id"),
        session=data.get("session")
    ).first()

    if existing:
        return Response(
            {"error": f"{existing.course_name} ({existing.course_id}) is already assigned to {existing.teacher.name} for session {existing.session}."},
            status=400
        )

    serializer = AssignedCourseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)





@api_view(['POST'])
def promote_to_teacher(request, pk):
    try:
        student = User.objects.get(pk=pk, role="student")
        student.role = "teacher"
        student.save()
        return Response({"success": f"{student.name} promoted to teacher."})
    except User.DoesNotExist:
        return Response({"error": "Student not found or already a teacher."}, status=404)




@api_view(['GET'])
def list_assigned_courses(request):
    courses = AssignedCourse.objects.all()
    serializer = AssignedCourseSerializer(courses, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_teacher_assigned_courses(request):
    """
    টিচারের firebase_uid অনুযায়ী তার অ্যাসাইন করা কোর্সের তালিকা রিঅ্যাক্ট ফ্রন্টএন্ডে পাঠাবে।
    """
    # ফ্রন্টএন্ড থেকে কুয়েরি প্যারামিটার হিসেবে পাঠানো হবে: /api/teacher/assigned-courses/?firebase_uid=XYZ
    firebase_uid = request.query_params.get('firebase_uid')
    
    if not firebase_uid:
        return Response({"error": "firebase_uid query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # প্রথমে ফায়ারবেস ইউআইডি দিয়ে টিচার অবজেক্টটি খুঁজে বের করছি
        teacher_user = User.objects.get(firebase_uid=firebase_uid, role='teacher')
    except User.DoesNotExist:
        return Response({"error": "Teacher not found with the provided Firebase UID."}, status=status.HTTP_404_NOT_FOUND)

    # ওই টিচারের সব অ্যাসাইন করা কোর্স ডাটাবেজ থেকে নিয়ে আসা
    courses = AssignedCourse.objects.filter(teacher=teacher_user)

    data = []
    for course in courses:
        data.append({
            "id": course.id,
            "course_id": course.course_id,
            "course_name": course.course_name,
            "session": course.session,
            "semester": course.semester,
            "teacher_name": course.teacher.name  # ✅ এখানে সরাসরি .name হবে
        })
        
    return Response(data, status=status.HTTP_200_OK)



@api_view(["POST"])
def create_class(request):

    try:

        user = User.objects.get(
            firebase_uid=request.data.get("firebase_uid")
        )

    except User.DoesNotExist:

        return Response(
            {"error": "User not found"},
            status=404
        )

    if user.role != "teacher":

        return Response(
            {"error": "Only teachers can create class"},
            status=403
        )

    serializer = ClassSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            teacher=user
        )

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["GET"])
def created_classes(request):

    firebase_uid = request.GET.get("firebase_uid")

    try:

        user = User.objects.get(
            firebase_uid=firebase_uid
        )

    except User.DoesNotExist:

        return Response(
            {"error": "User not found"},
            status=404
        )

    classes = Class.objects.filter(
        teacher=user
    ).order_by("-id")

    serializer = ClassSerializer(
        classes,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def see_students(request):

    students = User.objects.filter(
        role="student"
    )

    serializer = StudentSerializer(
        students,
        many=True
    )

    return Response(serializer.data)



@api_view(["GET"])
def see_teacher(request):

    teachers = User.objects.filter(
        role="teacher"
    )

    serializer = TeacherSerializer(
        teachers,
        many=True
    )

    return Response(serializer.data)







@api_view(['GET'])
@authentication_classes([FirebaseAuthentication])
@permission_classes([IsAuthenticated])
def get_students(request):
    students = User.objects.filter(role="student")
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)
