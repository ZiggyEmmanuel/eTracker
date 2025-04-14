# tracking/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PackageViewSet, TrackingUpdateViewSet, TrackingUpdateDeleteView, AdminPackageViewSet, check_auth_status, get_csrf_token, api_login, api_logout, ContactViewSet


# Router
router = DefaultRouter()
router.register(r'packages', PackageViewSet)
router.register(r'tracking-updates', TrackingUpdateViewSet)
router.register(r'admin/packages', AdminPackageViewSet, basename='admin-package')
router.register(r'contacts', ContactViewSet)


# URLs
urlpatterns = [
    path('', include(router.urls)),
    path('admin/tracking-updates/<int:pk>/', TrackingUpdateDeleteView.as_view(), name='tracking-update-delete'),
    path('auth/status/', check_auth_status, name='auth-status'),
    path('csrf/', get_csrf_token, name='csrf-token'),
    path('login/', api_login, name='api-login'),
    path('logout/', api_logout, name='api-logout'),
    
]