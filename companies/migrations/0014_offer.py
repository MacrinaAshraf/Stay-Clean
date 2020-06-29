# Generated by Django 3.0.7 on 2020-06-29 12:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_auto_20200624_1244'),
        ('companies', '0013_auto_20200624_1847'),
    ]

    operations = [
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('offer', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Company')),
                ('program', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='companies.Program')),
            ],
        ),
    ]
