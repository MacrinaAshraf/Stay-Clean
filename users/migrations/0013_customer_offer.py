# Generated by Django 3.0.7 on 2020-06-22 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_auto_20200622_2213'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='offer',
            field=models.SmallIntegerField(default=0, verbose_name='Discount'),
        ),
    ]