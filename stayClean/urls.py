"""stayClean URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from companies.views.ProgramsViews import ProgramView, ReviewView, ProgramPhotoView, RetDelUpProgramPhotoView, \
    SelectedProgramView
from companies.views.CompanyViews import ListCreateMessageView, RetrieveMessageView
from .views import Home, most_review_program, most_selected_program

router = routers.SimpleRouter()
router.register('programs', ProgramView)
router.register('reviews', ReviewView)
router.register('selected', SelectedProgramView)
# router.register('photo', ProgramPhotoView.as_view())


urlpatterns = [
    path('admin/', admin.site.urls),
    path('company/', include('companies.urls', namespace='companies')),
    path('api/', include(router.urls)),
    path('message/', ListCreateMessageView.as_view()),
    path('message/<int:pk>', RetrieveMessageView.as_view()),
    path('', Home),
    path('photo/', ProgramPhotoView.as_view(), name='upload_get_photo'),
    path('photo/<int:pk>', RetDelUpProgramPhotoView.as_view(), name='delete_update_photo'),
    path('most_review_program/', most_review_program),
    path('most_selected_program/', most_selected_program),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
