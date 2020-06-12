from django.urls import path, include, re_path
from .views.ProgramsViews import ProgramList, ProgramDetail, ProgramReview, ProgramReviewList

app_name = 'companies'

urlpatterns = [
    # path('programs', ProgramList.as_view()),
    # path('programs/<pk>', ProgramDetail.as_view())
    re_path(r'^programs/$', ProgramList),
    re_path(r'^programs/(?P<pk>[0-9]+)$', ProgramDetail),
    re_path(r'^program/review/(?P<pk>[0-9]+)$', ProgramReview),
    re_path(r'^program/review/$', ProgramReviewList),

]
