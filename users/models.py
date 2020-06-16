from datetime import timedelta, datetime

import jwt
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator


# Create your models here.
class MyUserManger(BaseUserManager):
    def create_user(self, email, first_name, last_name, phone, photo, password=None):
        if not email:
            raise ValueError("User must have an email...")
        if not first_name:
            raise ValueError('User must have a first name...')
        if not last_name:
            raise ValueError('User must have a last name...')
        if not phone:
            raise ValueError('User must have a phone...')
        # if not photo:
        #     raise ValueError('User must have a photo...')

        user = self.model(email=self.normalize_email(email), first_name=first_name, last_name=last_name, phone=phone,
                          photo=photo)

        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, phone, photo, password):
        user = self.create_user(email=self.normalize_email(email),
                                password=password,
                                first_name=first_name,
                                last_name=last_name,
                                phone=phone, photo=photo)

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# Create your models here.
class Users(AbstractBaseUser):
    phone_regex = RegexValidator(regex=r'^01[1|0|2|5][0-9]{8}$', message='phone must be an egyptian phone number...')
    first_name = models.CharField(verbose_name="first_name", null=False, max_length=50)
    last_name = models.CharField(verbose_name="last_name", null=False, max_length=50)
    email = models.EmailField(verbose_name='email', null=False, max_length=254, unique=True)
    phone = models.CharField(verbose_name="phone", null=True, validators=[phone_regex], max_length=14)
    photo = models.ImageField(verbose_name="User Photo", upload_to='users/images')
    facebook_link = models.URLField(null=True)
    date_joined = models.DateTimeField(verbose_name="date_joined",
                                       auto_now=True)
    last_login = models.DateTimeField(verbose_name="last_login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone', 'photo']

    objects = MyUserManger()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def token(self):
        """
        Allows us to get a user's token by calling `user.token` instead of
        `user.generate_jwt_token().

        The `@property` decorator above makes this possible. `token` is called
        a "dynamic property".
        """
        return self._generate_jwt_token()

    def get_name(self):
        """
        This method is required by Django for things like handling emails.
        Typically this would be the user's first and last name. Since we do
        not store the user's real name, we return their username instead.
        """
        return self.first_name

    def _generate_jwt_token(self):
        """
        Generates a JSON Web Token that stores this user's ID and has an expiry
        date set to 60 days into the future.
        """
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')