from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
# from companies.views.CompanyViews import ListCompanyView, RetrieveCompanyView

app_name = 'companies'

urlpatterns = [
    # path('<int:pk>', RetrieveCompanyView.as_view()),
    # path('', ListCompanyView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
