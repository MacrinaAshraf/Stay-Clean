from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from .models import Advertisement


class AdvertisementSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        max_length=None, allow_empty_file=True, use_url=True)


    class Meta:
        model = Advertisement
        fields = ('id', 'title', 'image', 'the_link')

    def get_image(self, obj):
        return obj.get_absolute_url()

