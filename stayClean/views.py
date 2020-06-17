from companies.models import Programs, Program_Reviews, Users, Companies, CompanyUserMessages, Selected_Programs
from companies.serializers.ProgramSerializers import ProgramSerializer
from companies.serializers.CompanySerializers import CompanySerializer, MessageSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def all_companies(request):
    companies = Companies.objects.all()
    serializer = CompanySerializer(companies, context={'request': request}, many=True)
    content = {
        'all_companies': serializer.data,
    }
    return Response(content, status=status.HTTP_200_OK)


@api_view(['GET'])
def most_selected_program(request):
    programs = Programs.objects.all();
    temp_count = -1
    temp_id = -1

    if programs.count() > 0:
        for program in programs:
            temp = Selected_Programs.objects.filter(program_id=program.id).count()
            try:
                if temp_count < temp:
                    temp_count = temp;
                    temp_id = program.id;
            except temp.DoesNotExist:
                print("")

        if temp_id != -1:
            program = Programs.objects.get(id=temp_id)
            serializer = ProgramSerializer(
                program,
                context={'request': request})
            content = {
                'most_selected_program': serializer.data
            }
            return Response(content, status=status.HTTP_200_OK)

        else:
            return Response({}, status=status.HTTP_200_OK)

    else:
        return Response({}, status=status.HTTP_200_OK)


@api_view(['GET'])
def most_review_program(request):
    programs = Programs.objects.all();
    temp_count = -1
    temp_id = -1

    if programs.count() > 0:
        for program in programs:
            temp = Program_Reviews.objects.filter(program_id=program.id).count()
            try:
                if temp_count < temp:
                    temp_count = temp;
                    temp_id = program.id;
            except temp.DoesNotExist:
                print("")

        if temp_id != -1:
            program = Programs.objects.get(id=temp_id)
            serializer = ProgramSerializer(
                program,
                context={'request': request})
            content = {
                'most_review_program': serializer.data
            }
            return Response(content, status=status.HTTP_200_OK)

        else:
            return Response({}, status=status.HTTP_200_OK)

    else:
        return Response({}, status=status.HTTP_200_OK)


@api_view(['POST'])
def sendMessage(request):
    try:
        company = Companies.objects.get(id=request.POST['company_id'])
        user = Users.objects.get(id=request.POST['user_id'])
        sender = request.POST['sender']
        new_message = CompanyUserMessages(
            company_id=company.id,
            user_id=user.id,
            sender=sender,
            message=request.POST.get('message'))

        new_message.save()
        return Response(status=status.HTTP_201_CREATED)

    except company.DoesNotExist:
        return Response(new_message.errors, status=status.HTTP_400_BAD_REQUEST)
    except user.DoesNotExist:
        return Response(new_message.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getMessage(request, id):
    message = CompanyUserMessages.objects.get(id=id)
    serializer = MessageSerializer(
        message,
        context={'request': request},
    )
    return Response(serializer.data, status=status.HTTP_200_OK)
