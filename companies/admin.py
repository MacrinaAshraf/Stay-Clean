from django.contrib import admin
from .models import Program, ProgramReview, CompanyUserMessage, SelectedProgram, ProgramPhoto

# admin.site.register(Programs)
# admin.site.register(Company)
admin.site.register(ProgramPhoto)
admin.site.register(CompanyUserMessage)
admin.site.register(SelectedProgram)


# admin.site.register(Program_Photos)


class PostReviewAdmin(admin.StackedInline):
    model = ProgramReview


@admin.register(Program)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostReviewAdmin]

    class Meta:
        model = Program


@admin.register(ProgramReview)
class PostReviewAdmin(admin.ModelAdmin):
    pass
