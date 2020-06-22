from rest_framework.utils import json
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from companies.models import \
    Program, \
    ProgramPhoto, \
    ProgramReview, \
    SelectedProgram

from companies.serializers.ProgramSerializers import \
    ProgramSerializer, \
    ReviewSerializer, \
    SelectedProgramSerializer, \
    ProgramPhotoSerializer

from users.models import Customer, Company
from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


def detail_route(methods, url_path):
    pass


class ProgramView(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

    def get_object(self):
        return get_object_or_404(
            Program,
            pk=self.kwargs.get('pk')
        )

    @action(detail=True, methods=['get'], name="Company Programs")
    def company_program(self, request, pk=None):
        user_select = Program.objects.filter(company=pk)
        serializer = ProgramSerializer(user_select, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], name="Program Reviews")
    def review(self, request, pk=None):
        reviews = ProgramReview.objects.filter(program=pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], name="Most Selected Program")
    def most_selected_program(self, request):
        programs = Program.objects.all()
        temp_count = -1
        temp_id = -1

        if programs.count() > 0:
            for program in programs:
                temp = SelectedProgram.objects.filter(program_id=program.id).count()
                try:
                    if temp_count < temp:
                        temp_count = temp
                        temp_id = program.id
                except temp.DoesNotExist:
                    print("")

            if temp_id != -1:
                program = Program.objects.get(id=temp_id)
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

    @action(detail=False, methods=['get'], name="Most Reviewed Program")
    def most_review_program(self, request):
        programs = Program.objects.all()
        temp_count = -1
        temp_id = -1

        if programs.count() > 0:
            for program in programs:
                temp = ProgramReview.objects.filter(program_id=program.id).count()
                try:
                    if temp_count < temp:
                        temp_count = temp
                        temp_id = program.id
                except temp.DoesNotExist:
                    print("")

            if temp_id != -1:
                program = Program.objects.get(id=temp_id)
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


class ProgramReviewView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = ProgramReview.objects.all()
    serializer_class = ReviewSerializer

    def get_object(self):
        return get_object_or_404(
            ProgramReview,
            pk=self.kwargs.get('pk')
        )


class SelectedProgramView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = SelectedProgram.objects.all()
    serializer_class = SelectedProgramSerializer

    def get_object(self):
        return get_object_or_404(
            SelectedProgram,
            pk=self.kwargs.get('pk')
        )

    @action(methods=['get'], detail=False, name="User Selected Programs")
    def user_program(self, request):
        user = Customer.objects.filter(user=request.user).first()
        if user is None:
            user = Company.objects.filter(user=request.user).first()
            programs = SelectedProgram.objects.filter(company=user)
        else:
            programs = SelectedProgram.objects.filter(customer=user)

        serializer = SelectedProgramSerializer(programs, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, name="all Users Select")
    def all_selected(self, request, pk=None):
        program = get_object_or_404(Program, id=pk)
        try:
            selected = SelectedProgram.objects.filter(program=program)
            serializer = SelectedProgramSerializer(selected, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except program.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


class ProgramPhotoView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = ProgramPhoto.objects.all()
    serializer_class = ProgramPhotoSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
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

    @action(methods=['get'], detail=True, name="Program Photo")
    def program_photo(self, request, pk=None):
        photos = ProgramPhoto.objects.filter(program=pk)
        serializer = ProgramPhotoSerializer(photos, many=True)
        return Response(serializer.data)
