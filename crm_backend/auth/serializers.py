# auth/serializers.py
from rest_framework import serializers
from sales.models import SalesUser

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesUser  # 指向自定义的 SalesUser 模型
        fields = ['username', 'password','role']

    def create(self, validated_data):
        # 创建新用户并设置密码
        user = SalesUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user