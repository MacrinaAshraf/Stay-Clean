from rest_framework.generics import get_object_or_404

from companies.models import Program, ProgramReview, User, ProgramPhoto, CompanyUserMessage
from companies.serializers.ProgramSerializers import ProgramSerializer
from companies.serializers.CompanySerializers import MessageSerializer, CompanySerializer
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.views import APIView
from users.models import Company


class ListCompanyView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class RetrieveCompanyView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class ListCreateMessageView(generics.ListCreateAPIView):
    permission_classes = (
        IsAuthenticated,
    )
    queryset = CompanyUserMessage.objects.all()
    serializer_class = MessageSerializer


class RetrieveMessageView(generics.RetrieveAPIView):
    permission_classes = (
        IsAuthenticated,
    )
    queryset = CompanyUserMessage.objects.all()
    serializer_class = MessageSerializer
    #
    # def get_object(self):
    #     return get_object_or_404(
    #         ProgramReview,
    #         pk=self.kwargs.get('pk')
    #     )

# class CompanyView2(APIView):
#     permission_classes = (IsAuthenticated,)
#
#     @api_view(['GET'])
#     def send(request, pk):
#         messages = CompanyUserMessage.objects.filter(company_id=pk, sender='C')
#         serializer = MessageSerializer(
#             messages,
#             context={'request': request},
#             many=True)
#         return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
#
#     @api_view(['GET'])
#     def receive(request, pk):
#         messages = CompanyUserMessage.objects.filter(company_id=pk, sender='U')
#         serializer = MessageSerializer(
#             messages,
#             context={'request': request},
#             many=True)
#         return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


# # @api_view(['GET'])
# def companies(request):
#     if request.method == 'GET':
#         data = Company.objects.all()
#
#         serializer = CompanySerializer(data, context={'request': request}, many=True)
#
#         return Response(serializer.data)
