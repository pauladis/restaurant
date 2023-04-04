from rest_framework import serializers
from ..models import MenuItem, Order, OrderItem, Categories

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        image_id = representation.get('image_id')

        if image_id:
            representation['image_id'] = image_id[:16] + ':8000' + image_id[16:]

        return representation


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        picture = representation.get('picture')

        if picture:
            representation['picture'] = picture[:16] + ':8000' + picture[16:]

        return representation


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'