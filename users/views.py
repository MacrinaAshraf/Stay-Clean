from .models import Customer
from .serializer import CustomerSerializer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


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
