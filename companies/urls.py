from django.urls import path, include
from .views.ProgramsViews import ProgramList, ProgramDetail

app_name = 'companies'

urlpatterns = [
            path('programs', ProgramList.as_view()),
            path('programs/<pk>', ProgramDetail.as_view())

    ]