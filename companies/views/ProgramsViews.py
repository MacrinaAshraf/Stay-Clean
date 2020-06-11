from companies.models import Programs
from companies.serializers.ProgramSerializers import ProgramSerializer
from rest_framework import generics

class ProgramList(generics.ListCreateAPIView):
    queryset = Programs.objects.all()
    serializer_class = ProgramSerializer

class ProgramDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Programs.objects.all()
    serializer_class = ProgramSerializer
