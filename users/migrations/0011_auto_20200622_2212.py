# Generated by Django 3.0.7 on 2020-06-22 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_auto_20200622_2208'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='discount',
            field=models.IntegerField(max_length=50, verbose_name='Discount'),
        ),
    ]