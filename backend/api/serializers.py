from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Category, Product, CartItem, Order, OrderItem

# AI-ASSISTED: GitHub Copilot

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category_details = CategorySerializer(source='category', read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'slug', 'description', 'price', 'image', 'category', 'category_details', 'stock', 'created_at')


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'status', 'total_price', 'address', 'created_at', 'items')
