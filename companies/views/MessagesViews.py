from rest_framework.decorators import action
from rest_framework.response import Response
from companies.models import CompanyUserMessage
from companies.serializers.MessageSerializers import MessageSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, generics, viewsets
from django.shortcuts import get_object_or_404
from companies.permissions import IsCompany, IsCustomer
from users.models import Customer, Company


def detail_route(methods, url_path):
    pass


class MessageView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = CompanyUserMessage.objects.all()
    serializer_class = MessageSerializer

    def get_object(self):
        return get_object_or_404(
            CompanyUserMessage,
            pk=self.kwargs.get('pk')
        )

    @action(detail=False, methods=['get'], name="Company Received Messages", permission_classes=[IsAuthenticated, IsCompany])
    def company_received_messages(self, request):
        company = get_object_or_404(Company, user=request.user)
        message = CompanyUserMessage.objects.filter(company=company, sender="U")
        try:
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except message.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], name="Company Send Messages", permission_classes=[IsAuthenticated, IsCompany])
    def company_send_messages(self, request):
        company = get_object_or_404(Company, user=request.user)
        message = CompanyUserMessage.objects.filter(company=company, sender="C")
        try:
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except message.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], name="User Received Messages", permission_classes=[IsAuthenticated, IsCustomer])
    def user_received_messages(self, request):
        customer = get_object_or_404(Customer, user=request.user)
        message = CompanyUserMessage.objects.filter(customer=customer, sender="C")
        try:
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except message.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], name="User Send Messages", permission_classes=[IsAuthenticated, IsCustomer])
    def user_send_messages(self, request):
        customer = get_object_or_404(Customer, user=request.user)
        message = CompanyUserMessage.objects.filter(customer=customer, sender="U")
        try:
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except message.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)
