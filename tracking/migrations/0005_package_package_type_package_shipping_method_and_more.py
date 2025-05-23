# Generated by Django 5.2 on 2025-04-07 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracking', '0004_package_receiver_email_package_receiver_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='package',
            name='package_type',
            field=models.CharField(blank=True, choices=[('Standard', 'Standard Package'), ('Express', 'Express Package'), ('Heavy', 'Heavy Package'), ('Fragile', 'Fragile Package'), ('Document', 'Document')], default='Standard', max_length=50),
        ),
        migrations.AddField(
            model_name='package',
            name='shipping_method',
            field=models.CharField(blank=True, choices=[('Standard', 'Standard Shipping'), ('Express', 'Express Shipping'), ('Next Day', 'Next Day Delivery'), ('Two Day', 'Two Day Delivery'), ('International', 'International Shipping')], default='Standard', max_length=50),
        ),
        migrations.AddField(
            model_name='package',
            name='weight',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Weight in kilograms', max_digits=6, null=True),
        ),
        migrations.AlterField(
            model_name='package',
            name='current_status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('In Transit', 'In Transit'), ('Out for Delivery', 'Out for Delivery'), ('Delivered', 'Delivered'), ('On Hold', 'On Hold'), ('Returned', 'Returned')], default='Pending', max_length=100),
        ),
    ]
