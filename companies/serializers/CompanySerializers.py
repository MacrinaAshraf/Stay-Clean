from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.generics import get_object_or_404

from companies.models import Company, CompanyUserMessage
from users.models import Customer


class CompanySerializer(serializers.ModelSerializer):
    user = SerializerMethodField()
    created_at = SerializerMethodField()
    logo = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True)

    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'logo', 'created_at', 'user', 'address')

    def get_user(self, obj):
        return obj.user.email

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def get_logo(self, obj):
        return obj.get_absolute_url()

