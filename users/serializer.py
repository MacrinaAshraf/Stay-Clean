from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.authtoken.models import Token


from .models import Customer, User, Company
from companies.serializers.CompanySerializers import CompanySerializer


class CustomerSerializer(serializers.ModelSerializer):
    created_at = SerializerMethodField()
    photo = serializers.ImageField(
        max_length=None, allow_empty_file=True, use_url=True)

    class Meta:
        model = Customer
        exclude = ['last_login']

    def get_created_at(self, obj):
        return obj.date_joined.strftime("%d/%m/%Y %H:%M")


class UserSerializer(serializers.ModelSerializer):
    # customer = CustomerSerializer()
    # company = CompanySerializer()
    class Meta:
        exclude = ['is_admin', 'is_staff']
        model = User

    def create(self, validated_data):#  self, request, *args, **kwargs):
        if validated_data.get('is_company'):
            is_company = validated_data.get('is_company')
        else:
            is_company = False

        user = User.objects.create(
            email=validated_data.get('email'), is_company=is_company)
        user.set_password(validated_data.get('password'))
        user.save()
        if is_company == True:
            company = Company.objects.filter(user=user.pk).first()
            company.name = self.context['request'].data.get('name')
            company.address = self.context['request'].data.get('address')
            company.description = self.context['request'].data.get('description')
            company.is_active = False
            company.save()
            # company.policy = policy_data
            # serializer = CompanySerializer()
            # if serializer.is_valid(data=**company):
            #     serializer.update(company)
        else:
            customer = Customer.objects.filter(user=user.pk).first()
            customer.first_name = self.context['request'].data.get('first_name')
            customer.last_name = self.context['request'].data.get('last_name')
            customer.discount = self.context['request'].data.get('discount')
            customer.phone = self.context['request'].data.get('phone')
            customer.save()
            print('before')
            print(self.context['request'].data.get('token'))
            if self.context['request'].data.get('token'):
                token = Token.objects.filter(user=user.pk).update(key = self.context['request'].data.get('token'))
                print('done')
            if self.context['request'].data.get('friendMail'):
                fMail = self.context['request'].data.get('friendMail')
               
                fUser = User.objects.filter(email=fMail).first()
                fCustomer = Customer.objects.filter(user=fUser.pk).first()
               
                if fCustomer.discount <= 80:
                  
                    fCustomer.discount = fCustomer.discount+10
                    fCustomer.save()
               

            serializer = CustomerSerializer(customer)

        return user

