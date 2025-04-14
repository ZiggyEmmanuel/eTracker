# tracking/models.py
from django.db import models
import string
import random
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class Package(models.Model):
    # Status choices - keeping them simple and consistent
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Transit', 'In Transit'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Delivered', 'Delivered'),
        ('On Hold', 'On Hold'),
        ('Returned', 'Returned'),
    ]

    PACKAGE_TYPE_CHOICES = [
        ('Standard', 'Standard Package'),
        ('Express', 'Express Package'),
        ('Heavy', 'Heavy Package'),
        ('Fragile', 'Fragile Package'),
        ('Document', 'Document'),
    ]

    SHIPPING_METHOD_CHOICES = [
        ('Standard', 'Standard Shipping'),
        ('Express', 'Express Shipping'),
        ('Next Day', 'Next Day Delivery'),
        ('Two Day', 'Two Day Delivery'),
        ('International', 'International Shipping'),
    ]

    tracking_number = models.CharField(max_length=30, unique=True, editable=False)
    sender_name = models.CharField(max_length=100)
    receiver_name = models.CharField(max_length=100)
    receiver_email = models.EmailField(blank=True, null=True)
    receiver_phone = models.CharField(max_length=20, blank=True, null=True)
    destination = models.CharField(max_length=255)
    current_status = models.CharField(
        max_length=100, 
        choices=STATUS_CHOICES,
        default='Pending'
    )

    # New fields
    weight = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        blank=True, 
        null=True,
        help_text="Weight in kilograms"
    )
    package_type = models.CharField(
        max_length=50,
        choices=PACKAGE_TYPE_CHOICES,
        default='Standard',
        blank=True
    )
    shipping_method = models.CharField(
        max_length=50,
        choices=SHIPPING_METHOD_CHOICES,
        default='Standard',
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def generate_tracking_number(self):
        # Generate a random string of letters and numbers
        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
        return f"TNT-{random_chars}"

    def save(self, *args, **kwargs):
        # Generate tracking number if it doesn't exist
        if not self.tracking_number:
            generated_tracking_number = self.generate_tracking_number()
            # Ensure uniqueness
            while Package.objects.filter(tracking_number=generated_tracking_number).exists():
                generated_tracking_number = self.generate_tracking_number()
            self.tracking_number = generated_tracking_number
        super().save(*args, **kwargs)

    def __str__(self):
        return self.tracking_number


class TrackingUpdate(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='updates')
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=100)
    timestamp = models.DateTimeField()  # Changed from auto_now_add=True to allow manual setting
    notes = models.TextField(blank=True, null=True)  # Optional field for additional information
    
    class Meta:
        ordering = ['-timestamp']  # Order by timestamp descending (newest first)
    
    def __str__(self):
        return f"{self.package.tracking_number} - {self.status} ({self.timestamp.strftime('%Y-%m-%d %H:%M')})"


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

    class Meta:
        ordering = ['-created_at']


# Signal to create a tracking update when a package is created
@receiver(post_save, sender=Package)
def create_initial_tracking_update(sender, instance, created, **kwargs):
    if created:  # Only run when a new Package is created, not when it's updated
        # Check if this package already has any tracking updates to avoid duplicates
        if not TrackingUpdate.objects.filter(package=instance).exists():
            TrackingUpdate.objects.create(
                package=instance,
                location="TRACKnTRACE Processing Center",
                status="Label Created, not yet in system",
                timestamp=timezone.now(),
                notes=" A status update is not yet available on your package, Awaiting pickup by courier. Check back later.",
            )

