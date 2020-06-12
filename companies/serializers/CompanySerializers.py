from rest_framework import serializers
from companies.models import Companies


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = ('id', 'name', 'description', 'logo', 'created_at', 'updated_at')

    def __str__(self):
        return self.name

