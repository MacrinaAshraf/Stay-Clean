from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path

from .views.CompanyViews import CompanyView #send, receive, companies
from .views.ProgramsViews import ProgramView #.ProgramList, ProgramDetail, ProgramReview, ProgramReviewList

app_name = 'companies'

urlpatterns = [
    # path('programs', ProgramList.as_view()),
    # path('programs/<pk>', ProgramDetail.as_view())
    path('', CompanyView.companies),
    re_path(r'^programs/$', ProgramView.ProgramList),
    re_path(r'^programs/(?P<pk>[0-9]+)$', ProgramView.ProgramDetail),
    re_path(r'^program/review/(?P<pk>[0-9]+)$', ProgramView.ProgramReview),
    re_path(r'^program/review/$', ProgramView.ProgramReviewList),
    re_path(r'^message/sender/(?P<pk>[0-9]+)$', CompanyView.send),
    re_path(r'^message/receiver/(?P<pk>[0-9]+)$', CompanyView.receive),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
