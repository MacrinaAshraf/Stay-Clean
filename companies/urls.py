from django.urls import path, include, re_path
from .views.ProgramsViews import ProgramList, ProgramDetail, ProgramReview, ProgramReviewList
from django.conf.urls.static import static 
from django.conf import settings 

app_name = 'companies'

urlpatterns = [
    # path('programs', ProgramList.as_view()),
    # path('programs/<pk>', ProgramDetail.as_view())
    re_path(r'^programs/$', ProgramList),
    re_path(r'^programs/(?P<pk>[0-9]+)$', ProgramDetail),
    re_path(r'^program/review/(?P<pk>[0-9]+)$', ProgramReview),
    re_path(r'^program/review/$', ProgramReviewList),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
