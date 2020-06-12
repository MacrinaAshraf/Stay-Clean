from companies.models import Programs, Program_Reviews, Users, Companies
from companies.serializers.ProgramSerializers import ProgramSerializer, ReviewSerializer
from companies.serializers.CompanySerializers import CompanySerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
import json


@api_view(['GET'])
def Home(request):
    companies = Companies.objects.all()
    CSerializer = CompanySerializer(companies, context={'request': request}, many=True)

    programs = Programs.objects.all();

    tempCount = -1
    tempID = -1

    if(programs.count() > 0):
        for prog in programs:
            temp = Program_Reviews.objects.filter(program_id=prog.id).count()
            try:
                if tempCount < temp:
                    tempCount = temp;
                    tempID = prog.id;
            except temp.DoesNotExist:
                print("")

        if (tempID != -1 ):
            program = Programs.objects.get(id=tempID)

            serializer = ProgramSerializer(
                program,
                context={'request': request})
            content= {
                'allCompanies': CSerializer.data,
                'mostTalk': serializer.data
            }
            return Response(content, status=status.HTTP_204_NO_CONTENT)

        else:
            content = {
                'allCompanies': CSerializer.data,
                'mostTalk': None
            }
            return Response(content, status=status.HTTP_204_NO_CONTENT)

    else:
        content = {
            'allCompanies': CSerializer.data,
            'mostTalk': None
        }
        return Response(content, status=status.HTTP_204_NO_CONTENT)
