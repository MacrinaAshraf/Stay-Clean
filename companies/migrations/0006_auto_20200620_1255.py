# Generated by Django 3.0.7 on 2020-06-20 12:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20200620_1249'),
        ('companies', '0005_auto_20200620_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companycontact',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Company'),
        ),
        migrations.AlterField(
            model_name='companyusermessage',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Company'),
        ),
        migrations.AlterField(
            model_name='companyusermessage',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Customer'),
        ),
        migrations.AlterField(
            model_name='program',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Company'),
        ),
        migrations.AlterField(
            model_name='programphoto',
            name='program',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='companies.Program'),
        ),
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
        migrations.AlterField(
            model_name='selectedprogram',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Company'),
        ),
        migrations.AlterField(
            model_name='selectedprogram',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Customer'),
        ),
        migrations.AlterField(
            model_name='selectedprogram',
            name='program',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='companies.Program'),
        ),
    ]
