from companies.models import Programs, Program_Reviews, Users, Program_Photos, CompanyUserMessages
from companies.serializers.ProgramSerializers import ProgramSerializer
from companies.serializers.CompanySerializers import MessageSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def send(request, pk):
    messages = CompanyUserMessages.objects.filter(company_id=pk, sender='C')
    serializer = MessageSerializer(
        messages,
        context={'request': request},
        many=True)
    return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def receive(request, pk):
    messages = CompanyUserMessages.objects.filter(company_id=pk, sender='U')
    serializer = MessageSerializer(
        messages,
        context={'request': request},
        many=True)
    return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
