from django.urls import path
from users.views import test, register_view, activate, login_view
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url


app_name = 'users'

urlpatterns = [
    path('', test, name='home'),
    path('register', register_view, name='register'),
    path('activate/<uidb64>/<time>',activate, name='activate'),
    path('login', login_view, name='login'),
    # path('logout', logout_view, name='logout'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)