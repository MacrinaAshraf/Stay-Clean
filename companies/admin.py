from django.contrib import admin
# from .models import Program, ProgramReview, CompanyUserMessage, SelectedProgram, ProgramPhoto, CompanyReview
from users.models import Company

# admin.site.site_header = "Stay Clean Admin Panel"

# # @admin.register(Company)
# class CompanyActivation(admin.ModelAdmin):
#     fields = ('policy', 'is_active')
#     # search_fields = ('name', 'address')
    # list_display = ('name', 'address')
    # def has_add_permission(self, request, obj=None):
    #     return False
    # def has_delete_permission(self, request, obj=None):
    #     return False

# admin.site.register(Programs)
# admin.site.register(Company, CompanyActivation)
# admin.site.register(ProgramPhoto)
# admin.site.register(CompanyUserMessage)
# admin.site.register(SelectedProgram)


# # admin.site.register(Program_Photos)


# class PostReviewAdmin(admin.StackedInline):
#     model = ProgramReview


# @admin.register(Program)
# class PostAdmin(admin.ModelAdmin):
#     inlines = [PostReviewAdmin]

#     class Meta:
#         model = Program


# @admin.register(ProgramReview)
# class PostReviewAdmin(admin.ModelAdmin):
#     pass


# @admin.register(CompanyReview)
# class PostReviewAdmin(admin.ModelAdmin):
#     pass
