from companies.models import Programs
from companies.serializers.ProgramSerializers import ProgramSerializer
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

@api_view(['PUT', 'DELETE','GET'])
def ProgramDetail(request, pk):
    try:
        program = Programs.objects.get(pk=pk)
    except Programs.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ProgramSerializer(program, data=request.data,context={'request': request})
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

       