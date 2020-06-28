from django.db import models
from django.contrib.sites.models import Site
from django.template.defaultfilters import slugify

class Advertisement(models.Model):
    image = models.ImageField(upload_to="adv/images", verbose_name='Image Data')
    title = models.TextField(max_length=30)
    the_link = models.TextField(max_length=200)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        relative = self.image.url
        return ('http://%s%s' % (Site.objects.get_current().domain, relative))
