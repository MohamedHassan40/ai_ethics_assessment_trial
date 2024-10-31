# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Company, Product, Review, Survey
from .serializers import (
    CompanySerializer, ProductSerializer, ReviewSerializer,SurveySerializer
)

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    serializer_class = ProductSerializer



class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = serializer.save()  # Save the review which updates the final score in the product

        response_data = serializer.data
        response_data['final_score'] = review.product.final_score  # Ensure final score is included in the response
        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer