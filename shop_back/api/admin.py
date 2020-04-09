from django.contrib import admin
from .models import Product, Category, ProductSpecification, ProductReview, ProductImage, Fabricator


# Register your models here.

class ProductImageInLine(admin.TabularInline):
    model = ProductImage


class ProductSpecificationInLine(admin.TabularInline):
    model = ProductSpecification


@admin.register(Fabricator)
class FabricatorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'grade')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category')
    inlines = (ProductImageInLine, ProductSpecificationInLine)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
