from rest_framework import routers
from api import views
from authe.views import UserViewSet


router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'fabricators', views.FabricatorViewSet)
router.register(r'reviews', views.ProductReviewViewSet)
router.register(r'users', UserViewSet)

urlpatterns = router.urls
