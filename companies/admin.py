from django.contrib import admin


from .models import Program, ProgramReview, CompanyUserMessage, SelectedProgram, ProgramPhoto

admin.site.register(Program)
# admin.site.register(Company)
admin.site.register(ProgramPhoto)
admin.site.register(CompanyUserMessage)
admin.site.register(SelectedProgram)


