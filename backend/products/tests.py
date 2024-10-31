from django.test import TestCase
from .models import Company, Product, Review

class ProductTestCase(TestCase):
    def setUp(self):
        company = Company.objects.create(name="Test Company", description="Test description")
        self.product = Product.objects.create(
            company=company,
            name="Test Product",
            description="A product description",
            challenge_addressed="Solving a challenge",
            user_guide_link="http://example.com/guide",
            product_language="English",
            product_sector="Tech",
            update_frequency="Monthly",
            update_basis="Feedback",
            development_roles="Developers only",
            data_source="Data source",
            model_training_data_size="100GB"
        )

    def test_product_creation(self):
        product = Product.objects.get(name="Test Product")
        self.assertEqual(product.name, "Test Product")

class ReviewTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(name="Company1", description="Company description")
        self.product = Product.objects.create(
            company=self.company,
            name="Product1",
            description="Test Product",
        )
        self.review = Review.objects.create(
            product=self.product,
            document_reviews={'doc1': {'criterion1': True}},
            comments={'doc1': 'Good'},
        )

    def test_review_score_calculation(self):
        self.assertEqual(self.review.calculate_final_score(), 100)  # Expect 100% satisfaction
