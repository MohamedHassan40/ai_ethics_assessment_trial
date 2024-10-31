from django.contrib import admin
from .models import Product, Review, Company, Survey

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'description')  # Display company name

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'company')  # Display product name and company
    search_fields = ('id','name', 'company__name')  # Add search capability

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id','product', 'version', 'document_reviews')  # Display product, version, and acceptance status
    search_fields = ('id','product__name',)  # Search by product name

class SurveyAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at')  # Display survey ID and creation date
    search_fields = ('id','comments_about_risk_management', 'general_comments')  # Add search capability


# Register your models with the customized admin classes
admin.site.register(Company, CompanyAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Survey, SurveyAdmin)

