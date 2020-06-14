from companies.models import Companies, Programs, Program_Reviews, Users, Program_Photos, CompanyUserMessages
from companies.serializers.ProgramSerializers import ProgramSerializer
from companies.serializers.CompanySerializers import MessageSerializer, CompanySerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class CompanyView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_view(['GET'])
    def send(self, request, pk):
        messages = CompanyUserMessages.objects.filter(company_id=pk, sender='C')
        serializer = MessageSerializer(
            messages,
            context={'request': request},
            many=True)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

    @api_view(['GET'])
    def receive(self, request, pk):
        messages = CompanyUserMessages.objects.filter(company_id=pk, sender='U')
        serializer = MessageSerializer(
            messages,
            context={'request': request},
            many=True)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

    @api_view(['GET', 'POST'])
    def companies(self, request):
        if request.method == 'GET':
            data = Companies.objects.all()

            serializer = CompanySerializer(data, context={'request': request}, many=True)

            return Response(serializer.data)

        elif request.method == 'POST':
            serializer = CompanySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
