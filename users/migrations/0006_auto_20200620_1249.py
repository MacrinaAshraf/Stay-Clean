# Generated by Django 3.0.7 on 2020-06-20 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_company_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='logo',
            field=models.ImageField(null=True, upload_to='companies/images', verbose_name='Company Image'),
        ),
    ]
