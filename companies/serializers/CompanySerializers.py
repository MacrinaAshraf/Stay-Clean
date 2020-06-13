from rest_framework import serializers
from companies.models import Companies, CompanyUserMessages


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = ('id', 'name', 'description', 'logo', 'created_at', 'updated_at')

    def __str__(self):
        return self.name


class MessageSerializer(serializers.ModelSerializer):
    company_id = serializers.RelatedField(source='Companies', read_only=True)
    user_id = serializers.RelatedField(source='Users', read_only=True)

    class Meta:
        model = CompanyUserMessages
        fields = ('id', 'message', 'sender',  'created_at', 'updated_at', 'company_id', 'user_id')

    def __str__(self):
        return self.message
