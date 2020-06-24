from rest_framework import serializers, status
from rest_framework.fields import SerializerMethodField
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from companies.models import Company, CompanyReview
from users.models import Customer


class CompanySerializer(serializers.ModelSerializer):
    user = SerializerMethodField()
    created_at = SerializerMethodField()
    logo = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True)
    policy = serializers.FileField(max_length=None, allow_empty_file=True, use_url=True)

    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'logo', 'created_at', 'user', 'address', 'policy', 'is_active')

    def get_user(self, obj):
        return obj.user.email

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def get_logo(self, obj):
        return obj.get_absolute_url()

    def get_policy(self, obj):
        return obj.get_absolute_file_url()


class ReviewSerializer(serializers.ModelSerializer):
    created_at = SerializerMethodField()

    class Meta:
        model = CompanyReview
        exclude = ['updated_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def create(self, validated_data):
        customer = get_object_or_404(Customer, user=self.context['request'].user)
        review = CompanyReview.objects.create(
            customer=customer,
            company=validated_data.get('company'),
            review=validated_data.get('review'),
        )
        return review

    def update(self, instance, validated_data):
        CompanyReview.objects.filter(pk=instance.pk).update(**validated_data)
        return CompanyReview.objects.filter(pk=instance.pk).first()

    def delete(self, request, pk):
        review = CompanyReview.objects.get(pk=pk)
        review.delete()
        return Response(status=status.HTTP_200_OK)
