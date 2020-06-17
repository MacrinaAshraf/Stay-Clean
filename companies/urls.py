from django.conf import settings
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.urls import path, re_path
from rest_framework import routers

from companies.views.CompanyViews import ListCompanyView, RetrieveCompanyView

app_name = 'companies'

urlpatterns = [
    path('<int:pk>', RetrieveCompanyView.as_view()),
    path('', ListCompanyView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
