from users.models import Company, User
from companies.models import CompanyReview, Offer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from companies.serializers.CompanySerializers import CompanySerializer, ReviewSerializer, OfferSerializer
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from companies.serializers.ProgramSerializers import ProgramSerializer
from companies.permissions import IsCompany
from companies.models import Program


class CompanyView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    parser_classes = [MultiPartParser, FileUploadParser, FormParser]

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

    @action(methods=['post'], detail=False, permission_classes=[AllowAny,])
    def add_image_policy(self, request, pk=None):
        policy_data = request.FILES.get('policy')
        image_data = request.FILES.get('image')
        user = User.objects.all().last()
        company = Company.objects.filter(user=user).first()
        print(company.user.email)
        company.logo = image_data
        company.policy = policy_data
        company.save()
        return Response({"found": "true"}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, name="logged in company offers")
    def my_offers(self, request):
        company = get_object_or_404(Company,user=request.user)
        offers = Offer.objects.filter(company=company.pk)
        serializer = OfferSerializer(offers,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(methods=['get'], detail=True, name="specific company offers")
    def company_offers(self, request, pk=None):
        offers = Offer.objects.filter(company=pk)
        serializer = OfferSerializer(offers,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CompanyReviewView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = CompanyReview.objects.all()
    serializer_class = ReviewSerializer

    def get_object(self):
        return get_object_or_404(
            CompanyReview,
            pk=self.kwargs.get('pk')
        )


class CompanyOffer(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

    def get_object(self):
        return get_object_or_404(
            Offer,
            pk=self.kwargs.get('pk')
        )
    
    def create(self, request, *args, **kwargs):
        company = get_object_or_404(Company, user=request.user)
        # print(request.data.get('program'))
        program = get_object_or_404(Program, pk=request.data.get('program'))
        # print(program.pk)
        info = {'company': company.pk, 'program': program.pk, 'offer': request.data.get('offer')}
        # offer = Offer.objects.create(
        #     company=company,
        #     program=request.get('program'),
        #     offer=request.get('offer'),
        # )
        # offer.save()
        serializer = OfferSerializer(data=info)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)