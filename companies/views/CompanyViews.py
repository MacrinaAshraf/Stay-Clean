from companies.models import CompanyUserMessage
from companies.serializers.CompanySerializers import CompanySerializer
from rest_framework import status, generics, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from users.models import Company
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action



class CompanyView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_object(self):
        return get_object_or_404(
            Company,
            pk=self.kwargs.get('pk')
        )

    @action(methods=['GET'], detail=False, permission_classes=[IsAuthenticated])
    def me(self, request, *args, **kwargs):
        company = get_object_or_404(Company, user=request.user)
        self.kwargs.update(pk=company.pk)
        return self.retrieve(request, *args, **kwargs)


# class RetrieveCompanyView(generics.RetrieveAPIView):
#     permission_classes = (AllowAny,)
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
