# teacher_dashboard/admin.py

from django.contrib import admin
from .models import Class
from .models import StudentMark
from .models import AssignedCourse

@admin.register(AssignedCourse)
class AssignedCourseAdmin(admin.ModelAdmin):
    # ড্যাশবোর্ডে যে কলামগুলো টেবিল আকারে দেখাবে
    list_display = ('course_id', 'course_name', 'teacher', 'semester', 'session', 'created_at')
    
    # ডানপাশে ফিল্টার করার অপশন
    list_filter = ('semester', 'session', 'teacher')
    
    # সার্চ বার (কোর্সের নাম, কোড বা টিচারের ইউজারনেম দিয়ে খোঁজার জন্য)
    search_fields = ('course_id', 'course_name', 'teacher__username')
    
    # নতুন কোর্স অ্যাসাইন করার সময় ফর্মের লেআউট
    ordering = ('-created_at',)


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):

    list_display = (
        "course_name",
        "course_code",
        "semester",
        "teacher",
        "date",
    )

    search_fields = (
        "course_name",
        "course_code",
    )

    list_filter = (
        "semester",
        "date",
    )


@admin.register(StudentMark)
class StudentMarkAdmin(admin.ModelAdmin):
    # ড্যাশবোর্ডে যে তথ্যগুলো কলাম আকারে দেখাবে
    list_display = ('get_student_name', 'get_student_reg', 'get_course_code', 'assignment', 'class_test_1', 'class_test_2', 'attendance_marks', 'is_locked')
    
    # ডানপাশে সেশন ও লক স্ট্যাটাস ফিল্টারিং
    list_filter = ('assigned_course__session', 'is_locked', 'assigned_course__semester')
    
    # 🎯 সার্চ বার: স্টুডেন্টের নাম, ইউনিক regId বা কোর্স কোড দিয়ে খোঁজার সুবিধা
    search_fields = ('student__name', 'student__regId', 'assigned_course__course_id')
    
    ordering = ('assigned_course', 'student__regId')

    # কাস্টম কলাম মেথড (সম্পর্কিত মডেলের ডাটা দেখানোর জন্য)
    def get_student_name(self, obj):
        return obj.student.name
    get_student_name.short_description = 'Student Name'

    def get_student_reg(self, obj):
        return obj.student.regId or "N/A"
    get_student_reg.short_description = 'Registration ID'

    def get_course_code(self, obj):
        return obj.assigned_course.course_id
    get_course_code.short_description = 'Course Code'