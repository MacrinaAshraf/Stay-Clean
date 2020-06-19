from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from companies.views.ProgramsViews import ProgramView, ReviewView, ProgramPhotoView, SelectedProgramView
from companies.views.MessagesViews import MessageView


router = routers.SimpleRouter()
router.register('programs', ProgramView)
router.register('reviews', ReviewView)
router.register('selected', SelectedProgramView)
router.register('photo', ProgramPhotoView)
router.register('message', MessageView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('company/', include('companies.urls', namespace='companies')),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
