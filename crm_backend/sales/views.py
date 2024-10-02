from rest_framework import viewsets
from .models import SalesUser
from .serializers import SalesUserSerializer

class SalesUserViewSet(viewsets.ModelViewSet):
    queryset = SalesUser.objects.all()
    serializer_class = SalesUserSerializer