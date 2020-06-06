from django.db import models
from django.template.defaultfilters import slugify
# from users.models import Users


# Create your models here.
def get_image_name(instance, filename):
    title = instance.project.title
    slug = slugify(title)
    return "companies/images/%s-%s" % (slug, filename)


class Companies(models.Model):
    name = models.TextField(max_length=200)
    description = models.TextField(max_length=500)
    logo = models.ImageField(upload_to=get_image_name, verbose_name='Company Image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CompanyContacts(models.Model):
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


# class CompanyUserMessages(models.Model):
#     company = models.ForeignKey(
#         'Companies', null=True, on_delete=models.CASCADE)
#     company = models.ForeignKey(
#         'Companies', null=True, on_delete=models.CASCADE)
#     message = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.message


class Programs(models.Model):
    company = models.ForeignKey(
        'Companies', null=True, on_delete=models.CASCADE)
    name = models.TextField(max_length=200)
    description = models.TextField(max_length=500)
    duration = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ProgramPhotos(models.Model):
    program = models.ForeignKey(
        'Programs', null=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_image_name, verbose_name='Program Image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

