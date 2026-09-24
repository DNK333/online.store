from django.urls import path

from .views import AuthViewSet, CategoryViewSet, ProductViewSet, CartViewSet, OrderViewSet, ProfileViewSet

urlpatterns = [
    path('auth/register/', AuthViewSet.as_view({'post': 'register'})),
    path('auth/login/', AuthViewSet.as_view({'post': 'login_user'})),
    path('auth/logout/', AuthViewSet.as_view({'post': 'logout_user'})),
    path('categories/', CategoryViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('categories/<int:pk>/', CategoryViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('products/', ProductViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('products/<int:pk>/', ProductViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('cart/', CartViewSet.as_view({'get': 'list'})),
    path('cart/add/', CartViewSet.as_view({'post': 'add_item'})),
    path('cart/update/<int:item_id>/', CartViewSet.as_view({'patch': 'update_item'})),
    path('cart/remove/<int:item_id>/', CartViewSet.as_view({'delete': 'remove_item'})),
    path('orders/', OrderViewSet.as_view({'get': 'list'})),
    path('orders/<int:pk>/', OrderViewSet.as_view({'get': 'retrieve'})),
    path('orders/create/', OrderViewSet.as_view({'post': 'create_order'})),
    path('profile/', ProfileViewSet.as_view({'get': 'list'})),
]
