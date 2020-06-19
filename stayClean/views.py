from companies.models import Program, ProgramReview, Company, CompanyUserMessage, SelectedProgram

from companies.serializers.ProgramSerializers import ProgramSerializer
from companies.serializers.CompanySerializers import CompanySerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

#
# @api_view(['GET'])
# def Home(request):
#     companies = Company.objects.all()
#     CSerializer = CompanySerializer(companies, context={'request': request}, many=True)
#     programs = Program.objects.all()


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
