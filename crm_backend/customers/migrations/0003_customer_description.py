# Generated by Django 3.2.25 on 2024-10-01 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='客户描述'),
        ),
    ]
