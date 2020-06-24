from django.contrib import admin

# Register your models here.
from .models import User, Company, Customer

admin.site.site_header = "Stay Clean Admin Panel"

@admin.register(Company)
class CompanyActivation(admin.ModelAdmin):
    fields = ('policy', 'is_active')
    search_fields = ('name', 'address')
    list_display = ('name', 'address')
    def has_add_permission(self, request, obj=None):
        return False
    def has_delete_permission(self, request, obj=None):
        return False
