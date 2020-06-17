from companies.models import Program, ProgramReview, User, Company, CompanyUserMessage
from companies.serializers.ProgramSerializers import ProgramSerializer, ReviewSerializer
from companies.serializers.CompanySerializers import CompanySerializer, MessageSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
import json


@api_view(['GET'])
def Home(request):
    companies = Company.objects.all()
    CSerializer = CompanySerializer(companies, context={'request': request}, many=True)

    programs = Program.objects.all()

    tempCount = -1
    tempID = -1

    if(programs.count() > 0):
        for prog in programs:
            temp = ProgramReview.objects.filter(program_id=prog.id).count()
            try:
                if tempCount < temp:
                    tempCount = temp;
                    tempID = prog.id;
            except temp.DoesNotExist:
                print("")

        if (tempID != -1 ):
            program = Program.objects.get(id=tempID)

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


# @api_view(['POST'])
# def sendMessage(request):
#         try:
#             company = Company.objects.get(id=request.POST['company_id'])
#             user = User.objects.get(id=request.POST['user_id'])
#             sender = request.POST['sender']
#             new_message = CompanyUserMessage(
#                 company_id=company.id,
#                 user_id=user.id,
#                 sender=sender,
#                 message=request.POST.get('message'))
#
#             new_message.save()
#             return Response(status=status.HTTP_201_CREATED)
#
#         except company.DoesNotExist:
#             return Response(new_message.errors, status=status.HTTP_400_BAD_REQUEST)
#         except user.DoesNotExist:
#             return Response(new_message.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['GET'])
# def getMessage(request, id):
#     message = CompanyUserMessage.objects.get(id=id)
#     serializer = MessageSerializer(
#         message,
#         context={'request': request},
#         )
#     return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
