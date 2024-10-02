from rest_framework import viewsets
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


@api_view(['GET'])
def get_customers(request):
    customers = Customer.objects.all()  # 获取所有客户数据
    serializer = CustomerSerializer(customers, many=True)  # 序列化为 JSON
    return Response(serializer.data)  # 返回客户数据的数组