from django.conf import settings
from rest_framework import serializers
from .models import Product, Category, ProductImage, ProductReview, ProductSpecification, Fabricator, \
    UserPersonalCart, CartItem, Order


class FabricatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fabricator
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'src',)


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = '__all__'


class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = ('key', 'value')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ('category',)

    def to_representation(self, instance):
        result = super().to_representation(instance)
        result['image'] = settings.BACKEND_URL + ImageSerializer(instance=instance.images.first()).data['src'] \
            if instance.images.first() else None
        return result


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    images = ImageSerializer(many=True)
    fabricator = FabricatorSerializer()
    reviews = ProductReviewSerializer(many=True)
    specifications = ProductSpecificationSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class CartItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('product', 'quantity')


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('product', 'quantity', 'total_price')
    product = ProductListSerializer()


class ShippingCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPersonalCart
        fields = ('items', 'total_price' )
    items = CartItemSerializer(many=True)


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('delivery_address', )


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'total_price', 'delivery_address', 'status')
