# Generated by Django 3.0.7 on 2020-06-13 18:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0008_programs_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='programs',
            name='image',
        ),
    ]
