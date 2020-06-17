from rest_framework import serializers, status
from rest_framework.fields import SerializerMethodField
from rest_framework.response import Response

from companies.models import Program, ProgramReview, SelectedProgram, ProgramPhoto
from users.models import Company, Customer

from rest_framework.generics import get_object_or_404


class ProgramSerializer(serializers.ModelSerializer):
    created_at = SerializerMethodField()

    class Meta:
        model = Program
        '''
            to list all fields
        '''
        exclude = ['updated_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def create(self, validated_data):
        company = get_object_or_404(Company, user=self.context['request'].user)
        program = Program.objects.create(
            company=company,
            name=validated_data.get('name'),
            description=validated_data.get('description', ""),
            duration=validated_data.get('duration'),
            price=validated_data.get('price')
        )
        return program

    def update(self, instance, validated_data):
        Program.objects.filter(pk=instance.pk).update(**validated_data)
        return Program.objects.filter(pk=instance.pk).first()

    def delete(self, request, pk):
        program = Program.objects.get(pk=pk)
        program.delete()
        return Response(status=status.HTTP_200_OK)


class ReviewSerializer(serializers.ModelSerializer):
    created_at = SerializerMethodField()

    class Meta:
        model = ProgramReview
        exclude = ['updated_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def create(self, validated_data):
        customer = get_object_or_404(Customer, user=self.context['request'].user)
        review = ProgramReview.objects.create(
            customer=customer,
            program=validated_data.get('program'),
            review=validated_data.get('review'),
        )
        return review

    def update(self, instance, validated_data):
        ProgramReview.objects.filter(pk=instance.pk).update(**validated_data)
        return ProgramReview.objects.filter(pk=instance.pk).first()

    def delete(self, request, pk):
        review = ProgramReview.objects.get(pk=pk)
        review.delete()
        return Response(status=status.HTTP_200_OK)


class SelectedProgramSerializer(serializers.ModelSerializer):
    # user = serializers.RelatedField(source='Users', read_only=True)
    # program = serializers.RelatedField(source='Programs', read_only=True)
    created_at = SerializerMethodField()

    class Meta:
        model = SelectedProgram
        # fields = ('pk', 'program', 'user', 'rate', 'notes', 'address', 'created_at', 'updated_at')
        exclude = ['updated_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def create(self, validated_data):
        customer = get_object_or_404(Customer, user=self.context['request'].user)
        selected_program = ProgramReview.objects.create(
            customer=customer,
            program=validated_data.get('program'),
            company=validated_data.get('company'),
            rate=validated_data.get('rate'),
            address=validated_data.get('address')
        )
        return selected_program

    def update(self, instance, validated_data):
        SelectedProgram.objects.filter(pk=instance.pk).update(**validated_data)
        return SelectedProgram.objects.filter(pk=instance.pk).first()

    def delete(self, request, pk):
        selected_program = SelectedProgram.objects.get(pk=pk)
        selected_program.delete()
        return Response(status=status.HTTP_200_OK)
