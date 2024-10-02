from django.contrib import admin
from .models import Customer

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone','data_source', 'is_closed', 'attended_first_live', 'attended_second_live')
    search_fields = ('name', 'phone','data_source')
    list_filter = ('is_closed', 'attended_first_live', 'attended_second_live')