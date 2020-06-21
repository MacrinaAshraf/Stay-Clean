# Generated by Django 3.0.7 on 2020-06-21 11:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20200620_1249'),
        ('companies', '0007_auto_20200620_1300'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programreview',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Customer'),
        ),
        migrations.AlterField(
            model_name='programreview',
            name='program',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='companies.Program'),
        ),
    ]
