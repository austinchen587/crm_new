from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, get_customers

# 初始化路由器
router = DefaultRouter()
router.register(r'customers', CustomerViewSet)  # 注册 ViewSet 路由

urlpatterns = [
    path('list/', get_customers, name='get_customers'),  # get_customers 视图
    path('', include(router.urls)),  # 使用 router 自动生成的 ViewSet 路由
]