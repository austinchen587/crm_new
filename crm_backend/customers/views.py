from rest_framework import viewsets
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrOwnerOrGroupLeader  # 自定义权限

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated, IsAdminOrOwnerOrGroupLeader]  # 登录验证

    def get_queryset(self):
        """
        根据用户角色返回相应的客户列表：
        - 管理员可以查看所有客户
        - 组长可以查看自己和组员的客户
        - 普通用户只能查看自己的客户
        """
        user = self.request.user

        if user.role == 'admin':
            return Customer.objects.all()
        elif user.role == 'group_leader':
            return Customer.objects.filter(created_by=user) | Customer.objects.filter(created_by__group_leader=user)
        else:
            return Customer.objects.filter(created_by=user)

    def perform_update(self, serializer):
        """
        限制客户信息修改：只有客户的所有者、组长和管理员可以修改。
        """
        user = self.request.user
        customer = self.get_object()

        if customer.created_by == user or user.role in ['group_leader', 'admin']:
            serializer.save()
        else:
            self.permission_denied(self.request, message="你没有权限修改此客户信息")

    def perform_destroy(self, instance):
        """
        限制客户删除：只有组长和管理员可以删除客户。
        """
        user = self.request.user

        if instance.created_by == user or user.role in ['group_leader', 'admin']:
            instance.delete()
        else:
            self.permission_denied(self.request, message="你没有权限删除此客户信息")

 

@api_view(['POST'])
def add_customer(request):
    if request.method == 'POST':
        data = request.data.copy()
        
        # 设置创建者和修改者
        data['created_by'] = request.user.id
        data['updated_by'] = request.user.id

        # 使用自定义序列化器，并确保 context 传递了 request
        serializer = CustomerSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            customer = serializer.save()
            return Response(CustomerSerializer(customer).data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # 打印错误，方便调试
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)