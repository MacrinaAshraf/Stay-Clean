from django.db import models
from django.template.defaultfilters import slugify
from users.models import Users


# Create your models here.
def get_image_name(instance, filename):
    title = instance.program.name
    slug = slugify(title)
    return "programs/images/%s-%s" % (slug, filename)


class Companies(models.Model):
    name = models.TextField(max_length=200)
    description = models.TextField(max_length=500)
    logo = models.ImageField(upload_to='companies/images', verbose_name='Company Image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Company_Contacts(models.Model):
    company = models.ForeignKey(
        'Companies', null=True, on_delete=models.CASCADE)
    contact_info = models.CharField(max_length=255)
    contact_type = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url


# class CompanyNumbers(models.Model):
#     company = models.ForeignKey(
#         'Companies', null=True, on_delete=models.CASCADE)
#     phone_number = models.CharField(max_length=11)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.phone_number


class CompanyUserMessages(models.Model):
    company = models.ForeignKey(
        'Companies', null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(
        Users, null=True, on_delete=models.CASCADE)
    message = models.TextField()
    sender = models.CharField(max_length=1, choices=(
        ('C', 'company'),
        ('U', 'user'),
    ))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.message


class Programs(models.Model):
    company = models.ForeignKey(
        'Companies', null=True, on_delete=models.CASCADE)
    name = models.TextField(max_length=200)
    description = models.TextField(max_length=500)
    duration = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Program_Photos(models.Model):
    program = models.ForeignKey(
        'Programs', null=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_image_name, verbose_name='Program Image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.program.name

class Program_Reviews(models.Model):
    program = models.ForeignKey(
        'Programs', null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(
        Users, null=True, on_delete=models.CASCADE)
    review = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s:%s" % (self.user, self.review)

class Selected_Programs(models.Model):
    program = models.ForeignKey(
        'Programs', null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(
        Users, null=True, on_delete=models.CASCADE)
    rate = models.IntegerField(max_length=5, choices=(
        (1,'1'),
        (2,'2'),
        (3,'3'),
        (4,'4'),
        (5,'5'),
    ))
    notes = models.TextField(max_length=500)
    address = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s:%s" % (self.user, self.rate)

