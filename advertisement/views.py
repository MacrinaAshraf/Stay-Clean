from django.shortcuts import render
from .models import Advertisement
from rest_framework import viewsets
from .serializer import AdvertisementSerializer
from django.shortcuts import get_object_or_404


def detail_route(methods, url_path):
    pass


class AdvertisementView(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer

    def get_object(self):
        return get_object_or_404(
            Advertisement,
            pk=self.kwargs.get('pk')
        )
