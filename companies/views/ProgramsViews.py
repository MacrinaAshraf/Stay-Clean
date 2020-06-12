from companies.models import Programs, Program_Reviews, Users
from companies.serializers.ProgramSerializers import ProgramSerializer, ReviewSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


# class ProgramList(generics.ListCreateAPIView):
#     queryset = Programs.objects.all()
#     serializer_class = ProgramSerializer

# class ProgramDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Programs.objects.all()
#     serializer_class = ProgramSerializer

@api_view(['GET', 'POST'])
def ProgramList(request):
    if request.method == 'GET':
        data = Programs.objects.all()

        serializer = ProgramSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProgramSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE', 'GET'])
def ProgramDetail(request, pk):
    try:
        program = Programs.objects.get(pk=pk)
    except Programs.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ProgramSerializer(program, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        program.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        data = Programs.objects.get(pk=pk)

        serializer = ProgramSerializer(data, context={'request': request})

        return Response(serializer.data)


@api_view(['POST'])
def ProgramReviewList(request):
    try:
        program = Programs.objects.get(id=request.POST['program_id'])
        user = Users.objects.get(id=request.POST['user_id'])
        new_review = Program_Reviews(
            program_id=program.id,
            user_id=user.id,
            review=request.POST.get('review'))

        new_review.save()
        return Response(status=status.HTTP_201_CREATED)

    except program.DoesNotExist :
        return Response(new_review.errors, status=status.HTTP_400_BAD_REQUEST)
    except user.DoesNotExist:
        return Response(new_review.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE','GET'])
def ProgramReview(request, pk):
    if request.method == 'GET':
        reviews = Program_Reviews.objects.all().filter(program_id=pk)
        serializer = ReviewSerializer(
            reviews,
            context={'request': request},
            many=True)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'DELETE':
        try:
            review = Program_Reviews.objects.get(id=pk)
            review.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except review.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
