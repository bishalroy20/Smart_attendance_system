from django.db import models
from django.db import models
from django.conf import settings
from authentication.models import User 

class AssignedCourse(models.Model):
    # course_id = models.CharField(max_length=50, verbose_name="Course Code/ID")
    course_id = models.CharField(max_length=50, db_index=True, verbose_name="Course Code/ID")
    course_name = models.CharField(max_length=255)
    session = models.CharField(max_length=50, help_text="e.g., 2023-24, Spring-2026")
    semester = models.IntegerField(help_text="Enter semester number (1-8)")
    
    teacher = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="assigned_courses",
        limit_choices_to={'role': 'teacher'} 
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course_id} - {self.course_name} ({self.teacher.name})"

    class Meta:
        verbose_name = "Assigned Course"
        verbose_name_plural = "Assigned Courses"



class Class(models.Model):
    course_name = models.CharField(
        max_length=100
    )
    course_code = models.CharField(max_length=50)
    semester = models.CharField(
        max_length=20
    )
    session = models.CharField(max_length=20, null=True, blank=True) 
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
        return f"{self.course_name} ({self.course_code}) - {self.session}"
    






class StudentMark(models.Model):
    # এটি নির্দিষ্ট শিক্ষক, সেশন এবং কোর্সের কম্বিনেশনকে লক করবে
    assigned_course = models.ForeignKey(
        AssignedCourse, 
        on_delete=models.CASCADE, 
        related_name="student_marks"
    )
    
    # কোন স্টুডেন্ট মার্কস পাচ্ছে (কাস্টম ইউজার মডেল থেকে ফিল্টারড)
    student = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'role': 'student'},
        related_name="my_marks"
    )
    
    # 📝 ৩টি কন্টিনিউয়াস অ্যাসেসমেন্ট ফিল্ড (Editable)
    assignment = models.FloatField(default=0.0)
    class_test_1 = models.FloatField(default=0.0)
    class_test_2 = models.FloatField(default=0.0)
    
    # 🕒 অটোমেটিক অ্যাটেনডেন্স মার্কস (স্মার্ট ক্যালকুলেশন থেকে আসবে)
    attendance_marks = models.FloatField(default=0.0)
    
    # 🔒 ফাইনাল লক স্ট্যাটাস (True হলে ফ্রন্টএন্ড-ব্যাকএন্ড দুই জায়গাতেই এডিট বন্ধ)
    is_locked = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # একই সেশনের একই কোর্সে একজন স্টুডেন্ট কেবল একটিই মার্কস রো (Row) পাবে
        unique_together = ('assigned_course', 'student')
        verbose_name = "Student Mark"
        verbose_name_plural = "Student Marks"

    def __str__(self):
        return f"Marks: {self.student.name} ({self.student.regId or 'No ID'}) - Course: {self.assigned_course.course_id}"