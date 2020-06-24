from django.db import models
from users.models import Customer, Company
from django.contrib.sites.models import Site
from django.template.defaultfilters import slugify
from django.core.validators import MaxValueValidator, MinValueValidator



# Create your models here.
def get_image_name(instance, filename):
    title = instance.program.name
    slug = slugify(title)
    return "programs/images/%s-%s" % (slug, filename)


class CompanyContact(models.Model):
    company = models.ForeignKey(
        Company, null=True, on_delete=models.CASCADE)
    contact_info = models.CharField(max_length=255)
    contact_type = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.contact_info



class CompanyUserMessage(models.Model):
    company = models.ForeignKey(
        Company, null=True, on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, null=True, on_delete=models.CASCADE)
    message = models.TextField()
    sender = models.CharField(max_length=1, choices=(
        ('C', 'company'),
        ('U', 'user'),
    ))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.message


class Program(models.Model):
    company = models.ForeignKey(
        Company, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    duration = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    avgRate = models.DecimalField(default=0.0, max_digits=2, decimal_places=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return self.name


class ProgramPhoto(models.Model):
    program = models.ForeignKey(
        'Program', null=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_image_name, verbose_name='Program Image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return self.program.name

    def get_absolute_url(self):
        relative = self.image.url
        return ('http://%s%s' % (Site.objects.get_current().domain, relative))


class ProgramReview(models.Model):
    program = models.ForeignKey(
        'Program', null=True, on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, null=True, on_delete=models.CASCADE)
    review = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CompanyReview(models.Model):
    company = models.ForeignKey(
        Company, null=True, on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, null=True, on_delete=models.CASCADE)
    review = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class SelectedProgram(models.Model):
    program = models.ForeignKey(
        'Program', null=True, on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, null=True, on_delete=models.CASCADE)
    company = models.ForeignKey(
        Company, null=True, on_delete=models.CASCADE)
    area = models.IntegerField(null=False, validators=[MinValueValidator(5)])
    price = models.IntegerField(null=False, validators=[MinValueValidator(0)])
    pay = models.BooleanField(default=False)
    rate = models.IntegerField(choices=(
        (0, '0'),
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ))
    notes = models.TextField(max_length=500)
    address = models.TextField(max_length=500)
    date = models.DateTimeField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s:%s" % (self.customer, self.rate)
