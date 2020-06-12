from rest_framework import serializers
from companies.models import Programs, Program_Reviews


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programs 
        fields = ('pk', 'name', 'description', 'duration', 'price', 'created_at', 'updated_at')


    def __str__(self):
        return self.name



class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.RelatedField(source='Users', read_only=True)
    program = serializers.RelatedField(source='Programs', read_only=True)

    class Meta:
        model = Program_Reviews
        fields = ('pk', 'program', 'user', 'review', 'created_at', 'updated_at')

    def __str__(self):
        return self.review
