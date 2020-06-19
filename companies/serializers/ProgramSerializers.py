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
            price=validated_data.get('price'),
            is_active=True
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


class ProgramPhotoSerializer(serializers.ModelSerializer):
    created_at = SerializerMethodField()
    image = serializers.ImageField()

    class Meta:
        model = ProgramPhoto
        exclude = ['updated_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def get_image(self, obj):
        return obj.get_absolute_url()


def get_average_rate(program):
    print(program)
    rate_sum = 0
    program_lists = SelectedProgram.objects.filter(program=program)

    for program_list in program_lists:
        rate_sum = rate_sum + program_list.rate
    avg_rate = rate_sum / len(program_lists)
    return avg_rate


class SelectedProgramSerializer(serializers.ModelSerializer):
    created_at = SerializerMethodField()

    class Meta:
        model = SelectedProgram
        exclude = ['updated_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y %H:%M")

    def create(self, validated_data):
        customer = get_object_or_404(Customer, user=self.context['request'].user)
        selected_program = SelectedProgram.objects.create(
            customer=customer,
            program=validated_data.get('program'),
            company=validated_data.get('company'),
            rate=validated_data.get('rate', 0),
            address=validated_data.get('address'),
            is_active=True
        )
        return selected_program

    def update(self, instance, validated_data):
        SelectedProgram.objects.filter(pk=instance.pk).update(**validated_data)
        selected_program = SelectedProgram.objects.filter(pk=instance.pk).first()
        avg_rate = get_average_rate(selected_program.program)
        Program.objects.filter(pk=selected_program.program.pk).update(avgRate=avg_rate)
        return SelectedProgram.objects.filter(pk=instance.pk).first()

    def delete(self, request, pk):
        selected_program = SelectedProgram.objects.get(pk=pk)
        selected_program.delete()
        return Response(status=status.HTTP_200_OK)

