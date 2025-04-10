# tracking/admin.py
from django.contrib import admin
from .models import Package, TrackingUpdate


class TrackingUpdateInline(admin.TabularInline):
    model = TrackingUpdate
    extra = 1


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('tracking_number', 'sender_name', 'receiver_name', 'current_status', 'created_at')
    search_fields = ('tracking_number', 'sender_name', 'receiver_name')
    list_filter = ('current_status', 'created_at')
    readonly_fields = ('tracking_number',)  # Make tracking_number read-only in the admin
    inlines = [TrackingUpdateInline]
    
    def get_fieldsets(self, request, obj=None):
        # If creating a new object (obj=None), don't show tracking_number field
        if obj is None:
            return (
                (None, {
                    'fields': ('sender_name', 'receiver_name', 'receiver_email', 'receiver_phone', 'package_type', 'weight', 'shipping_method', 'destination', 'current_status')
                }),
            )
        # For existing objects, show tracking_number as read-only
        return (
            (None, {
                'fields': ('tracking_number', 'sender_name', 'receiver_name', 'receiver_email', 'receiver_phone', 'package_type', 'weight', 'shipping_method', 'destination', 'current_status')
            }),
        )


@admin.register(TrackingUpdate)
class TrackingUpdateAdmin(admin.ModelAdmin):
    list_display = ('package', 'status', 'location', 'timestamp')
    list_filter = ('status', 'timestamp')
    search_fields = ('package__tracking_number', 'location')