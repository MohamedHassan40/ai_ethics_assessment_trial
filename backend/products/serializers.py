# serializers.py

from rest_framework import serializers
from .models import Product, Company, Review, Survey

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'description', 'company_url', 'company_size']

class ProductSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)  # Read-only field

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description','license_type_details','data_stored_details', 'challenge_addressed','product_type_other', 'user_guide_link',
            'company', 'company_name', 'product_language', 'product_sector',
            'final_score', 'update_frequency', 'update_basis', 'development_roles',
            'data_source', 'model_training_data_size',
                'data_stored', 'license_type', 'clients', 'number_of_clients', 'top_clients','region','product_status', 
    'product_launch_date', 
            'risk_management', 'transparency_report', 'fairness_equity',
            'accountability_and_responsibility', 'system_performance_indicators', 'privacy_and_security',
            'stakeholder_engagement', 'compliance_in_principles', 'impact_of_ai_system_on_human_rights',
            'social_environmental_and_cultural_impact_assessment', 'training_intiatives_for_employees','document_reviews','product_type','number_of_employees'
        ]
        read_only_fields = ['final_score', 'company_name']  # Prevent manual updates


class ReviewSerializer(serializers.ModelSerializer):
    final_score = serializers.FloatField(source='product.final_score', read_only=True)  # Read-only field
    companyName= serializers.CharField(source='company.name', read_only=True)
    productName= serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'product', 'version', 'submission_date', 'revision_date',
            'document_reviews', 'comments', 'final_score','companyName','productName'
        ]
        read_only_fields = ['version', 'submission_date', 'revision_date', 'final_score','companyName','productName']

    def create(self, validated_data):
        # The `save` method on the Review model handles final_score and versioning
        return Review.objects.create(**validated_data)
class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = [
            'id', 'created_at',
            'comments_about_risk_management', 'comments_about_transparency_report',
            'comments_about_fairness_equity', 'comments_about_accountability_and_responsibility',
            'comments_about_system_performance_indicators', 'comments_about_privacy_and_security',
            'comments_about_stakeholder_engagement', 'comments_about_compliance_in_principles',
            'comments_about_impact_of_ai_system_on_human_rights',
            'comments_about_social_environmental',
            'comments_about_training_initiatives_for_employees',
            'general_comments', 'improvements'
        ]