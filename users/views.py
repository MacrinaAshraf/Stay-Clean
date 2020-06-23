from .models import Customer, User, Company
from .serializer import CustomerSerializer, UserSerializer
from companies.serializers.CompanySerializers import CompanySerializer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from companies.models import CompanyUserMessage
from companies.permissions import IsCustomer, IsCompany


def detail_route(methods, url_path):
    pass


class CustomerView(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get_object(self):
        return get_object_or_404(
            Customer,
            pk=self.kwargs.get('pk')
        )

    @action(detail=True, methods=['get'], name="customer name")
    def customer_name(self, request, pk=None):
        user_select = Customer.objects.get(id=pk)
        try:
            serializer = CustomerSerializer(user_select, many=False)
            return Response(
                {
                    "name": serializer.data['first_name'] +
                    "  " +
                    serializer.data['last_name']
                },
                status=status.HTTP_200_OK)
        except user_select.DoesNotExist:
            return Response({}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], name="company's customers", permission_classes=[IsAuthenticated, IsCompany])
    def company_customer(self, request):
        company = get_object_or_404(Company, user=request.user)
        message = CompanyUserMessage.objects.filter(company=company, sender="U")
        id_list = []
        for mess in message:
            id_list.append(mess.customer_id)
        all_customers = Customer.objects.filter(pk__in=id_list)
        serializer = CustomerSerializer(all_customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(methods=['GET'], detail=False, permission_classes=[IsAuthenticated])
    def me(self, request, *args, **kwargs):
        customer = get_object_or_404(Customer, user=request.user)
        self.kwargs.update(pk=customer.pk)
        return self.retrieve(request, *args, **kwargs)


class UserView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(
            User,
            pk=self.kwargs.get('pk')
        )

    @action(methods=['GET'], detail=False, permission_classes=[IsAuthenticated])
    def me(self, request, *args, **kwargs):
        self.kwargs.update(pk=request.user.id)
        return self.retrieve(request, *args, **kwargs)

