from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from companies.models import Program, ProgramReview, ProgramPhoto, SelectedProgram
from companies.serializers.ProgramSerializers import ProgramSerializer, ReviewSerializer, SelectedProgramSerializer, \
    ProgramPhotoSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, generics, viewsets
from django.shortcuts import get_object_or_404


class ProgramView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

    def get_object(self):
        return get_object_or_404(
            Program,
            pk=self.kwargs.get('pk')
        )


class ReviewView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = ProgramReview.objects.all()
    serializer_class = ReviewSerializer

    def get_object(self):
        return get_object_or_404(
            ProgramReview,
            pk=self.kwargs.get('pk')
        )


class SelectedProgramView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = SelectedProgram.objects.all()
    serializer_class = SelectedProgramSerializer

    def get_object(self):
        return get_object_or_404(
            SelectedProgram,
            pk=self.kwargs.get('pk')
        )


class ProgramPhotoView(APIView):
    permission_classes = (IsAuthenticated,)
    queryset = ProgramPhoto.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        image = request.FILES["image"]
        data = json.loads(request.data['data'])
        print(image, data.get('program'))
        info = {'image': image, 'program': data.get('program')}
        photo_serializer = ProgramPhotoSerializer(data=info)
        if photo_serializer.is_valid():
            photo_serializer.save()
            return Response(photo_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', photo_serializer.errors)
            return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        photos = ProgramPhoto.objects.all()
        serializer = ProgramPhotoSerializer(photos, many=True)
        return Response(serializer.data)


class RetDelUpProgramPhotoView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = ProgramPhoto.objects.all()

    serializer_class = ProgramPhotoSerializer

#
#     @api_view(['GET'])
#     def  CompanyProgram(request,cpk , ppk):
#
#         if request.method == 'GET':
#
#             userselect =get_object_or_404(Program, company_id=cpk, id=ppk)
#             serializer = ProgramSerializer(userselect, context={'request': request})
#             return Response(serializer.data, status=status.HTTP_200_OK)
