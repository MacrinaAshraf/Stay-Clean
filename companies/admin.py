from django.contrib import admin
from .models import Program, ProgramReview, CompanyUserMessage, ProgramPhoto, SelectedProgram

# admin.site.register(Programs)
# admin.site.register(Company)
admin.site.register(ProgramReview)
admin.site.register(CompanyUserMessage)
admin.site.register(SelectedProgram)


# admin.site.register(Program_Photos)


class PostImageAdmin(admin.StackedInline):
    model = ProgramPhoto


@admin.register(Program)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageAdmin]

    class Meta:
        model = Program


@admin.register(ProgramPhoto)
class PostImageAdmin(admin.ModelAdmin):
    pass
