from django.contrib.sites.models import Site
from django.urls import reverse
from rest_framework.authtoken.models import Token
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver


class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email...")

        user = self.model(email=self.normalize_email(email), **extra_fields)

        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_admin', True)
        user = self.create_user(email=self.normalize_email(email),
                                password=password, **extra_fields)
        return user


# Create your models here.
class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='Email', null=False, max_length=254, unique=True)
    username = None
    is_company = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    

    USERNAME_FIELD = 'email'

    objects = MyUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer_profile')
    phone_regex = RegexValidator(regex=r'^01[1|0|2|5][0-9]{8}$',
                                 message='phone must be an egyptian phone number...')
    first_name = models.CharField(verbose_name="First Name", null=False, max_length=50)
    last_name = models.CharField(verbose_name="Last Name", null=False, max_length=50)
    discount = models.IntegerField(verbose_name="Discount", null=False, default=0)
    phone = models.CharField(verbose_name="Phone", null=True, validators=[phone_regex], max_length=14)
    photo = models.ImageField(verbose_name="User Photo", upload_to='users/images',null=True,blank=True)
    facebook_link = models.URLField(null=True,blank=True)
    date_joined = models.DateTimeField(verbose_name="date_joined",
                                       auto_now=True)
    last_login = models.DateTimeField(verbose_name="last_login", auto_now=True)

    def __str__(self):
        return self.first_name

    def get_absolute_url(self):
        relative = self.photo.url
        return ('http://%s%s' % (Site.objects.get_current().domain, relative))


class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company_profile')
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    logo = models.ImageField(upload_to='companies/images', verbose_name='Company Image', null=True)
    address = models.CharField(max_length=300)
    policy = models.FileField(upload_to='companies/policy', verbose_name='Company Policy')
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email

    def get_absolute_file_url(self):
        relative = self.policy.url
        return ('http://%s%s' % (Site.objects.get_current().domain, relative))

    def get_absolute_url(self):
        relative = self.logo.url
        return ('http://%s%s' % (Site.objects.get_current().domain, relative))


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    print('****', created, "is admin", instance.is_admin)
    if created:
        if instance.is_admin:
            return
        if instance.is_company == True:  # and not instance.is_admin:
            Company.objects.create(user=instance)
        else:
            Customer.objects.create(user=instance)
        Token.objects.create(user=instance)

