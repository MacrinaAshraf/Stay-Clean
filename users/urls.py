from django.urls import re_path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
# from .views import RegistrationAPIView
# from .views import LoginAPIView

app_name = 'users'

urlpatterns = [
    # re_path(r'^register/?$', RegistrationAPIView.as_view(), name='user_registration'),
    # re_path(r'^login/?$', LoginAPIView.as_view(), name='user_login'),
]



# urlpatterns = [
#     path('', test, name='home'),
#     path('register', register_view, name='register'),
#     path('activate/<uidb64>/<time>', activate, name='activate'),
#     path('login', login_view, name='login'),
#     # path('logout', logout_view, name='logout'),
# ]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)