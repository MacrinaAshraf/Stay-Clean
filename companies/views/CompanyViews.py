from companies.models import CompanyUserMessage
from companies.serializers.CompanySerializers import CompanySerializer
from rest_framework import status, generics, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from users.models import Company


class ListCompanyView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class RetrieveCompanyView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
