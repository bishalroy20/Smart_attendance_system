from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_students(request):
    data = [
        {"id": 1, "name": "Rahim", "roll": "101"},
        {"id": 2, "name": "Karim", "roll": "102"},
    ]
    return Response(data)
