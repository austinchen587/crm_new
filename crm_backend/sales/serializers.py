# sales/serializers.py
from rest_framework import serializers
from .models import SalesUser

class SalesUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesUser
        fields = ['id', 'username', 'role', 'is_active']