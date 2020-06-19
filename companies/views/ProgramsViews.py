from rest_framework.decorators import action
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

from users.models import Customer, Company


def detail_route(methods, url_path):
    pass


class ProgramView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
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

    @action(detail=True, methods=['get'], name="Most Selected Program")
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

    @action(detail=True, methods=['get'], name="Most Reviewed Program")
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


class ProgramPhotoView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
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

# class ProgramList(generics.ListCreateAPIView):
#     queryset = Programs.objects.all()
#     serializer_class = ProgramSerializer

# class ProgramDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Programs.objects.all()
#     serializer_class = ProgramSerializer
# class ProgramView(APIView):
#     permission_classes = (AllowAny)
#
#     @api_view(['GET', 'POST'])
#     def ProgramList(request):
#         if request.method == 'GET':
#             data = Programs.objects.all()
#
#             serializer = ProgramSerializer(data, context={'request': request}, many=True)
#
#             return Response(serializer.data)
#
#         elif request.method == 'POST':
#             serializer = ProgramSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(status=status.HTTP_201_CREATED)
#
#             return Response(serializer.errors)
#
#     @api_view(['PUT', 'DELETE', 'GET'])
#     def ProgramDetail(request, pk):
#         try:
#             program = Programs.objects.get(pk=pk)
#
#         except Programs.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#
#         if request.method == 'PUT':
#             serializer = ProgramSerializer(program, data=request.data, context={'request': request})
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(status=status.HTTP_200_OK)
#             return Response(serializer.errors)
#
#         elif request.method == 'DELETE':
#             program.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#
#         elif request.method == 'GET':
#             data = get_object_or_404(Programs, pk=pk)
#             photo = Program_Photos.objects.filter(program=program)
#             serializer = ProgramSerializer(data, context={'request': request})
#
#             return Response(serializer.data)
#
#     @api_view(['POST'])
#     def ProgramReviewList(request):
#         try:
#             program = Programs.objects.get(id=request.POST['program_id'])
#             user = Users.objects.get(id=request.POST['user_id'])
#             new_review = Program_Reviews(
#                 program_id=program.id,
#                 user_id=user.id,
#                 review=request.POST.get('review'))
#
#             new_review.save()
#             return Response(status=status.HTTP_201_CREATED)
#
#         except program.DoesNotExist:
#             return Response(new_review.errors, status=status.HTTP_400_BAD_REQUEST)
#         except user.DoesNotExist:
#             return Response(new_review.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     @api_view(['DELETE', 'GET'])
#     def ProgramReview(request, pk):
#         if request.method == 'GET':
#             reviews = Program_Reviews.objects.all().filter(program_id=pk)
#             serializer = ReviewSerializer(
#                 reviews,
#                 context={'request': request},
#                 many=True)
#             return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
#
#         elif request.method == 'DELETE':
#             try:
#                 review = Program_Reviews.objects.get(id=pk)
#                 review.delete()
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#
#             except review.DoesNotExist:
#                 return Response(status=status.HTTP_404_NOT_FOUND)
#
#     @api_view(['GET', 'POST'])
#     def SelectedProgramList(request):
#         if request.method == 'GET':
#             data = Selected_Programs.objects.all()
#
#             serializer = SelectedProgramSerializer(data, context={'request': request}, many=True)
#
#             return Response(serializer.data)
#
#         elif request.method == 'POST':
#             serializer = SelectedProgramSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(status=status.HTTP_201_CREATED)
#
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     @api_view(['GET', 'PUT'])
#     def SelectedProgram(request, pk):
#         try:
#             selectedprogram = Selected_Programs.objects.get(pk=pk)
#
#         except Selected_Programs.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#
#         if request.method == 'PUT':
#             newrate = Selected_Programs.objects.filter(pk=pk).update(rate=request.data['rate'])
#             return Response(status=status.HTTP_200_OK)
#
#
#         elif request.method == 'GET':
#             data = get_object_or_404(Selected_Programs, pk=pk)
#             serializer = SelectedProgramSerializer(data, context={'request': request})


#
#     @api_view(['GET'])
#     def  CompanyProgram(request,cpk , ppk):
#
#         if request.method == 'GET':
#
#             userselect =get_object_or_404(Program, company_id=cpk, id=ppk)
#             serializer = ProgramSerializer(userselect, context={'request': request})
#             return Response(serializer.data, status=status.HTTP_200_OK)
