# tracking/serializers.py
from rest_framework import serializers
from .models import Package, TrackingUpdate, Contact

class PackageSerializer(serializers.ModelSerializer):
    updates = serializers.SerializerMethodField()
    
    class Meta:
        model = Package
        fields = ['id', 'tracking_number', 'sender_name', 'receiver_name',
                  'receiver_email', 'receiver_phone', 'package_type', 'weight', 'shipping_method', # Add new fields 
                  'destination', 'current_status', 'created_at', 'updates']
        read_only_fields = ['tracking_number', 'created_at']  # Explicitly mark as read-only
    
    def get_updates(self, obj):
        updates = obj.updates.all()
        return TrackingUpdateSerializer(updates, many=True).data


class TrackingUpdateSerializer(serializers.ModelSerializer):
    formatted_timestamp = serializers.SerializerMethodField()
    
    class Meta:
        model = TrackingUpdate
        fields = ['id', 'location', 'status', 'timestamp', 'formatted_timestamp', 'notes', 'package']
    
    def get_formatted_timestamp(self, obj):
        return obj.timestamp.strftime("%b %d, %Y %I:%M %p")


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['created_at']