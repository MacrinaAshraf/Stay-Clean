from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.generics import get_object_or_404

from companies.models import Company, CompanyUserMessage
from users.models import Customer


class CompanySerializer(serializers.ModelSerializer):
    user = SerializerMethodField()
    created_at = SerializerMethodField()
    logo = SerializerMethodField()

    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'logo', 'created_at', 'user')

    def get_user(self, obj):
        return obj.user.email

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def get_logo(self, obj):
        return obj.get_absolute_url()


class MessageSerializer(serializers.ModelSerializer):

    created_at = SerializerMethodField()

    class Meta:
        model = CompanyUserMessage
        exclude = ['updated_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def create(self, validated_data):
        customer = ""
        company = ""
        if validated_data.get('sender') == 'U':
            customer = get_object_or_404(Customer, user=self.context['request'].user)
            company = validated_data.get('company')
        elif validated_data.get('sender') == 'C':
            company = get_object_or_404(Company, user=self.context['request'].user)
            customer = validated_data.get('customer') # or user from frontend

        message = CompanyUserMessage.objects.create(
            customer=customer,
            company=company,
            message=validated_data.get('message'),
            sender=validated_data.get('sender'),
        )
        return message

