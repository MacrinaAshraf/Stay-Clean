# Generated by Django 3.0.7 on 2020-06-17 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='avgRate',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
    ]
