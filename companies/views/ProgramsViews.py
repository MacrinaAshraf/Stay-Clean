from companies.models import Program, ProgramReview, User, ProgramPhoto, SelectedProgram
from companies.serializers.ProgramSerializers import ProgramSerializer, ReviewSerializer, SelectedProgramSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, generics, viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
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
            ProgramReview,
            pk=self.kwargs.get('pk')
        )

# class ProgramView(APIView):
#     permission_classes = (IsAuthenticated,)
#
#     @api_view(['GET', 'POST'])
#     def ProgramList(request):
#         if request.method == 'GET':
#             data = Program.objects.all()
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
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     @api_view(['PUT', 'DELETE', 'GET'])
#     def ProgramDetail(request, pk):
#         try:
#             program = Program.objects.get(pk=pk)
#
#         except Program.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#
#         if request.method == 'PUT':
#             serializer = ProgramSerializer(program, data=request.data, context={'request': request})
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(status=status.HTTP_200_OK)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#         elif request.method == 'DELETE':
#             program.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#
#         elif request.method == 'GET':
#             data = get_object_or_404(Program, pk=pk)
#             photo = ProgramPhoto.objects.filter(program=program)
#             serializer = ProgramSerializer(data, context={'request': request})
#
#             return Response(serializer.data)
#
#     @api_view(['POST'])
#     def ProgramReviewList(request):
#         try:
#             program = Program.objects.get(id=request.POST['program_id'])
#             user = User.objects.get(id=request.POST['user_id'])
#             new_review = ProgramReview(
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
#             reviews = ProgramReview.objects.all().filter(program_id=pk)
#             serializer = ReviewSerializer(
#                 reviews,
#                 context={'request': request},
#                 many=True)
#             return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
#
#         elif request.method == 'DELETE':
#             try:
#                 review = ProgramReview.objects.get(id=pk)
#                 review.delete()
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#
#             except review.DoesNotExist:
#                 return Response(status=status.HTTP_404_NOT_FOUND)
#
#     @api_view(['GET', 'POST'])
#     def SelectedProgramList(request):
#         if request.method == 'GET':
#             data = SelectedProgram.objects.all()
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
#             selectedprogram = SelectedProgram.objects.get(pk=pk)
#
#         except SelectedProgram.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#
#         if request.method == 'PUT':
#             newrate = SelectedProgram.objects.filter(pk=pk).update(rate=request.data['rate'])
#             return Response(status=status.HTTP_200_OK)
#
#
#         elif request.method == 'GET':
#             data = get_object_or_404(SelectedProgram, pk=pk)
#             serializer = SelectedProgramSerializer(data, context={'request': request})
#         return Response(serializer.data)
#
#
#     @api_view(['GET'])
#     def  CompanyProgram(request,cpk , ppk):
#
#         if request.method == 'GET':
#
#             userselect =get_object_or_404(Program, company_id=cpk, id=ppk)
#             serializer = ProgramSerializer(userselect, context={'request': request})
#             return Response(serializer.data, status=status.HTTP_200_OK)
