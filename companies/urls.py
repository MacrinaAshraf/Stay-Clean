from django.urls import path, include, re_path
from .views.ProgramsViews import ProgramList, ProgramDetail, ProgramReview, ProgramReviewList, SelectedProgramList, SelectedProgram, CompanyProgram

from .views.CompanyViews import send, receive
from django.conf.urls.static import static
from django.conf import settings 

app_name = 'companies'

urlpatterns = [
    # path('programs/', ProgramList),
    # path('programs/<int:pk>', ProgramDetail),
    re_path(r'^programs/$', ProgramList),
    re_path(r'^programs/(?P<pk>[0-9]+)$', ProgramDetail),
    re_path(r'^program/review/(?P<pk>[0-9]+)$', ProgramReview),
    re_path(r'^program/review/$', ProgramReviewList),
    re_path(r'^selectedprograms/$', SelectedProgramList),
    re_path(r'^selectedprograms/(?P<pk>[0-9]+)$', SelectedProgram),
    re_path(r'^message/sender/(?P<pk>[0-9]+)$', send),
    re_path(r'^message/receiver/(?P<pk>[0-9]+)$', receive),
    re_path(r'^companyprogram/(?P<cpk>[0-9]+)/(?P<ppk>[0-9]+)$', CompanyProgram)


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

