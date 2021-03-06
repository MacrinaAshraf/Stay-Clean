# Generated by Django 3.0.7 on 2020-06-22 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20200620_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='facebook_link',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='users/images', verbose_name='User Photo'),
        ),
    ]
