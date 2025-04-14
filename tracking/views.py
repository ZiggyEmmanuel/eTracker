# tracking/views.py
from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Package, TrackingUpdate, Contact
from .serializers import PackageSerializer, TrackingUpdateSerializer, ContactSerializer
from django.utils import timezone
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout

from django.middleware.csrf import get_token
from django.http import JsonResponse



class IsStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
    

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

    @action(detail=False, methods=['get'], url_path='track/(?P<tracking_number>[^/.]+)')
    def track_by_number(self, request, tracking_number=None):
        try:
            package = Package.objects.get(tracking_number=tracking_number)
            serializer = self.get_serializer(package)
            return Response(serializer.data)
        except Package.DoesNotExist:
            return Response({"detail": "Package not found."}, status=status.HTTP_404_NOT_FOUND)
    


class TrackingUpdateViewSet(viewsets.ModelViewSet):
    queryset = TrackingUpdate.objects.all()
    serializer_class = TrackingUpdateSerializer
    
    # Optional: Add filtering by package
    def get_queryset(self):
        queryset = super().get_queryset()
        package_id = self.request.query_params.get('package', None)
        if package_id:
            queryset = queryset.filter(package_id=package_id)
        return queryset
    


class TrackingUpdateDeleteView(DestroyAPIView):
    queryset = TrackingUpdate.objects.all()
    permission_classes = [IsAuthenticated]  # Add appropriate permissions

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminPackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsStaffUser]

    def get_permissions(self):
        """
        Admin endpoints require staff permissions
        """
        if self.request.path.startswith('/api/admin/'):
            return [IsStaffUser()]
        return [permissions.AllowAny()]

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": "Package deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        package = self.get_object()
        status = request.data.get('status')
        location = request.data.get('location')
        notes = request.data.get('notes')

        # Check if a custom timestamp was provided, otherwise use the current time
        timestamp_str = request.data.get('timestamp')
        if timestamp_str:
            # Parse the timestamp string into a datetime object
            try:
                timestamp = timezone.datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
            except ValueError:
                # If parsing fails, fall back to current time
                timestamp = timezone.now()
        else:
            timestamp = timezone.now()
        
        TrackingUpdate.objects.create(
            package=package,
            status=status,
            location=location,
            notes=notes,
            timestamp=timestamp
        )
        
        # Only update package current_status if explicitly provided
        if 'current_status' in request.data:
            package.current_status = request.data['current_status']
            package.save()
            
            return Response({'status': 'status updated'})


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]  # Allow anyone to submit contact form

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(
                {"message": "Your message has been sent successfully!"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return Response({
            'isAuthenticated': True,
            'isAdmin': user.is_staff,
            'username': user.username
        })
    return Response({
        'error': 'Invalid credentials'
    }, status=401)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Add authentication requirement
def api_logout(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})


@api_view(['GET'])
@permission_classes([AllowAny])
def check_auth_status(request):

    if request.user.is_authenticated:
        return Response({
            'isAuthenticated': True,
            'isAdmin': request.user.is_staff,  # or is_superuser depending on your needs
            'username': request.user.username
        })
    return Response({
        'isAuthenticated': False,
        'isAdmin': False,
        'username': None
    })