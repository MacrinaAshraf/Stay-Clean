from .models import Advertisement
from django.shortcuts import render
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .serializer import AdvertisementSerializer
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser


def detail_route(methods, url_path):
    pass


class AdvertisementView(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer
    parser_classes = [MultiPartParser, FileUploadParser, FormParser]

    def get_object(self):
        return get_object_or_404(
            Advertisement,
            pk=self.kwargs.get('pk')
        )
    
