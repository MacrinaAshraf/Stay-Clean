from rest_framework import serializers
from companies.models import Programs


class ProgramSerializer(serializers.ModelSerializer):

    class Meta:
        model = Programs 
        fields = ('pk', 'name', 'description', 'duration', 'price', 'created_at','updated_at')


    def __str__(self):
        return self.name




class ReviewSerializer(serializers.ModelSerializer):
    review_set = ProgramSerializer(many=True)
    user =

    class Meta:
        model = Programs
        fields = ('pk', 'name', 'description', 'duration', 'price', 'created_at','updated_at')


    def __str__(self):
        return self.name


