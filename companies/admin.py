from django.contrib import admin
from .models import Programs, Companies, Program_Reviews, CompanyUserMessages, Program_Photos, Selected_Programs

# admin.site.register(Programs)
admin.site.register(Companies)
admin.site.register(Program_Reviews)
admin.site.register(CompanyUserMessages)
admin.site.register(Selected_Programs)

# admin.site.register(Program_Photos)

class PostImageAdmin(admin.StackedInline):
    model = Program_Photos

@admin.register(Programs)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageAdmin]

    class Meta:
       model = Programs

@admin.register(Program_Photos)
class PostImageAdmin(admin.ModelAdmin):
    pass