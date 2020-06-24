from users.models import Company
from companies.models import CompanyReview
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from companies.serializers.CompanySerializers import CompanySerializer, ReviewSerializer
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from companies.serializers.ProgramSerializers import ProgramSerializer
from companies.permissions import IsCompany
from companies.models import Program


class CompanyView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    parser_classes = [MultiPartParser, FormParser]

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

    @action(detail=True, methods=['get'], name="company_programCompany Reviews")
    def review(self, request, pk=None):
        reviews = CompanyReview.objects.filter(company=pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], name="loggedin_company_program", permission_classes=[IsAuthenticated, IsCompany])
    def program(self, request):
        company = get_object_or_404(Company,user=request.user)
        programs = Program.objects.filter(company=company.pk)
        serializer = ProgramSerializer(programs,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# class RetrieveCompanyView(generics.RetrieveAPIView):
#     permission_classes = (AllowAny,)
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer

class CompanyReviewView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = CompanyReview.objects.all()
    serializer_class = ReviewSerializer

    def get_object(self):
        return get_object_or_404(
            CompanyReview,
            pk=self.kwargs.get('pk')
        )
