# Generated by Django 3.0.7 on 2020-06-22 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_customer_discount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='discount',
            field=models.IntegerField(verbose_name='Discount'),
        ),
    ]