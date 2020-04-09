from django.db import models
from django.db.models import Sum
from utils.file_upload import image_path
from django.contrib.auth.models import User
from datetime import datetime, timedelta


class Category(models.Model):
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    name = models.CharField(verbose_name='Название категории',
                            max_length=100, )

    def __str__(self):
        return self.name

    @property
    def get_products(self):
        return Product.objects.filter(category=self)


class Fabricator(models.Model):
    class Meta:
        verbose_name = 'Производитель'
        verbose_name_plural = 'Производители'

    name = models.CharField(verbose_name='Название производителя',
                            max_length=500)


class Product(models.Model):
    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    name = models.CharField(max_length=200, verbose_name='Название продукта')
    price = models.FloatField(verbose_name='Цена')
    has_discount = models.BooleanField(default=False, verbose_name='Есть скидка?')
    discount = models.PositiveSmallIntegerField(default=0, verbose_name='Скидка')
    price_with_discount = models.FloatField(verbose_name='Цена со скидкой', blank=True, null=True)
    in_top = models.BooleanField(default=False, verbose_name='В топе?')
    short_description = models.TextField(blank=True, null=True, verbose_name='Краткое описание продукта')
    in_stock = models.BooleanField(default=False, verbose_name='Есть в наличие?')
    likes = models.PositiveIntegerField(default=0, verbose_name='Понравилось')
    long_description = models.TextField(blank=True, null=True, verbose_name='Полное описание продукта')
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    is_new = models.BooleanField(default=True, verbose_name='Новый продукт')
    fabricator = models.ForeignKey(Fabricator,
                                   on_delete=models.CASCADE,
                                   related_name='products',
                                   verbose_name='Производитель',
                                   blank=True,
                                   null=True, )
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', verbose_name='Продукты')

    def __str__(self):
        return f'{self.name} {self.price}'

    def save(self, *args, **kwargs):
        if self.has_discount:
            self.price_with_discount = self.price - (self.price * self.discount) // 100
        super().save(*args, **kwargs)


class ProductSpecification(models.Model):
    class Meta:
        verbose_name = 'Характеристика продукта'
        verbose_name_plural = 'Характеристики продукта'

    key = models.CharField(max_length=50, verbose_name='Ключ')
    value = models.CharField(max_length=50, verbose_name='Значение')
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE,
                                verbose_name='Продукт',
                                related_name='specifications',
                                blank=True,
                                null=True,)


class ProductImage(models.Model):
    class Meta:
        verbose_name = 'Картинка продукта'
        verbose_name_plural = 'Картинки продукта'

    src = models.ImageField(upload_to=image_path,
                            verbose_name='Картинки')
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE,
                                verbose_name='Продукт',
                                related_name='images',
                                blank=True,
                                null=True)


class ProductReview(models.Model):
    class Meta:
        verbose_name = 'Отзыв о продукте'
        verbose_name_plural = 'Отзывы о продукте'
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE,
                                related_name='reviews',
                                verbose_name='Продукт',)
    grade = models.PositiveIntegerField()
    content = models.TextField(blank=True, null=True)
    user_full_name = models.CharField(max_length=1000, blank=True, null=True)
    email = models.EmailField()


class Order(models.Model):
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    owner = models.ForeignKey(User,
                              on_delete=models.CASCADE,
                              related_name='orders',
                              verbose_name='Заказчик',
                              blank=True,
                              null=True)
    delivery_address = models.TextField()
    status = models.CharField(default='In process', max_length=100)

    @property
    def total_price(self):
        total = 0
        for item in self.items.all():
            total += item.total_price
        return total


class UserPersonalCart(models.Model):
    class Meta:
        verbose_name = 'Корзина пользователя'

    owner = models.OneToOneField(User,
                                 on_delete=models.CASCADE,
                                 verbose_name='Владелец корзины',
                                 related_name='cart',
                                 blank=True,
                                 null=True)

    @property
    def total_price(self):
        total = 0
        for item in self.items.all():
            total += item.total_price
        return total


class CartItem(models.Model):
    class Meta:
        verbose_name = 'Запись корзины'
        verbose_name_plural = 'Записи корзины'
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE,
                                related_name='carts',
                                verbose_name='Продукт')
    quantity = models.PositiveIntegerField()
    cart = models.ForeignKey(UserPersonalCart,
                             on_delete=models.CASCADE,
                             related_name='items',
                             verbose_name='Корзина',
                             blank=True,
                             null=True)
    order = models.ForeignKey(Order,
                              on_delete=models.CASCADE,
                              related_name='items',
                              verbose_name='Заказ',
                              blank=True,
                              null=True)

    @property
    def total_price(self):
        return (100 - self.product.discount) / 100 * self.product.price * self.quantity

