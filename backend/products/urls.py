from rest_framework.routers import DefaultRouter
from .views import (
    CompanyViewSet, ProductViewSet, ReviewViewSet
    ,SurveyViewSet
)
router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'products', ProductViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'surveys', SurveyViewSet)



urlpatterns = router.urls
