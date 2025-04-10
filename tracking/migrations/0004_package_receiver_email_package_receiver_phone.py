# Generated by Django 5.2 on 2025-04-06 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracking', '0003_alter_package_tracking_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='package',
            name='receiver_email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='package',
            name='receiver_phone',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
