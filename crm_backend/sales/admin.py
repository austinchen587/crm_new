from django.contrib import admin
from .models import SalesUser

@admin.register(SalesUser)
class SalesUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'role', 'is_active')
    list_filter = ('role', 'is_active')
    search_fields = ('username',)