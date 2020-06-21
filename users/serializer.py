from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from .models import Customer, User, Company


class CustomerSerializer(serializers.ModelSerializer):
    created_at = SerializerMethodField()
    photo = serializers.ImageField(
        max_length=None, allow_empty_file=True, use_url=True)

    class Meta:
        model = Customer
        fields = ('id', 'first_name', 'last_name', 'phone',
                  'photo', 'facebook_link', 'created_at',
                  'date_joined', 'last_login',
                  )

    def get_created_at(self, obj):
        return obj.date_joined.strftime("%d/%m/%Y %H:%M")


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        exclude = ['is_admin', 'is_staff']
        model = User

