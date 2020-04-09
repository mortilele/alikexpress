from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action

from .models import Product, Category, Fabricator, ProductReview
from .serializers import ProductSerializer, CategorySerializer, ProductListSerializer, \
    FabricatorSerializer, ProductReviewSerializer
from rest_framework import viewsets, status, mixins
from rest_framework.response import Response


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['in_top', 'fabricator', 'is_new', 'category', ]
    ordering_fields = ['name', 'price', 'timestamp']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductSerializer
        return self.serializer_class


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class FabricatorViewSet(viewsets.ModelViewSet):
    queryset = Fabricator.objects.all()
    serializer_class = FabricatorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['products__category']

    def get_queryset(self):
        result = super().get_queryset()
        return result.distinct()


class ProductReviewViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer

    @action(detail=False, methods=['post'])
    def like(self, request):
        try:
            product_id = self.request.data['product']
            product = Product.objects.get(id=product_id)
            product.likes += 1
            product.save()
            return Response({'code': '0'})
        except Exception as e:
            print(str(e))

    @action(detail=False, methods=['get'])
    def total_ratings(self, request):
        product_id = self.request.query_params['product']
        product_reviews = ProductReview.objects.filter(product_id = product_id)
        ones = product_reviews.filter(grade=1).count()
        twos = product_reviews.filter(grade=2).count()
        threes = product_reviews.filter(grade=3).count()
        fours = product_reviews.filter(grade=4).count()
        fives = product_reviews.filter(grade=5).count()
        total = product_reviews.count()
        average = round((ones * 1 + twos * 2 + threes * 3 + fours * 4 + fives * 5) / total) if total else 0
        return JsonResponse({
            'distribution': [
                {
                    'value': 5,
                    'count': fives
                },
                {
                    'value': 4,
                    'count': fours
                },
                {
                    'value': 3,
                    'count': threes
                },
                {
                    'value': 2,
                    'count': twos
                },
                {
                    'value': 1,
                    'count': ones
                }
            ],
            'total': total,
            'average': average
        })