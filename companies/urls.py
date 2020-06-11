from django.urls import path, include , re_path
from .views.ProgramsViews import ProgramList, ProgramDetail

app_name = 'companies'

urlpatterns = [
            # path('programs', ProgramList.as_view()),
            # path('programs/<pk>', ProgramDetail.as_view())
            re_path(r'^programs/$',ProgramList),
            re_path(r'^programs/(?P<pk>[0-9]+)$',ProgramDetail)

    ]