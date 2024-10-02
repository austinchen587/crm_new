from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SalesUserViewSet

router = DefaultRouter()
router.register(r'sales', SalesUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]