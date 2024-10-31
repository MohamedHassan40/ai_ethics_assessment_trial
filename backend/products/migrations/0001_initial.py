# Generated by Django 5.0.6 on 2024-10-24 08:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('company_url', models.CharField(max_length=255)),
                ('company_size', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('comments_about_risk_management', models.TextField(blank=True, null=True)),
                ('comments_about_transparency_report', models.TextField(blank=True, null=True)),
                ('comments_about_fairness_equity', models.TextField(blank=True, null=True)),
                ('comments_about_accountability_and_responsibility', models.TextField(blank=True, null=True)),
                ('comments_about_system_performance_indicators', models.TextField(blank=True, null=True)),
                ('comments_about_privacy_and_security', models.TextField(blank=True, null=True)),
                ('comments_about_stakeholder_engagement', models.TextField(blank=True, null=True)),
                ('comments_about_compliance_in_principles', models.TextField(blank=True, null=True)),
                ('comments_about_impact_of_ai_system_on_human_rights', models.TextField(blank=True, null=True)),
                ('comments_about_social_environmental', models.TextField(blank=True, null=True)),
                ('comments_about_training_initiatives_for_employees', models.TextField(blank=True, null=True)),
                ('general_comments', models.TextField(blank=True, null=True)),
                ('improvements', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('challenge_addressed', models.TextField()),
                ('user_guide_link', models.URLField()),
                ('product_language', models.JSONField()),
                ('product_sector', models.JSONField()),
                ('final_score', models.FloatField(default=0.0)),
                ('update_frequency', models.CharField(max_length=100)),
                ('update_basis', models.JSONField()),
                ('development_roles', models.JSONField()),
                ('product_type', models.JSONField()),
                ('number_of_employees', models.CharField(max_length=100)),
                ('data_source', models.TextField()),
                ('model_training_data_size', models.CharField(max_length=100)),
                ('document_reviews', models.JSONField(default=dict)),
                ('data_stored', models.JSONField()),
                ('region', models.JSONField()),
                ('product_status', models.TextField()),
                ('license_type', models.JSONField()),
                ('clients', models.JSONField()),
                ('number_of_clients', models.IntegerField(blank=True, null=True)),
                ('top_clients', models.JSONField()),
                ('product_launch_date', models.DateField()),
                ('risk_management', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('transparency_report', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('fairness_equity', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('accountability_and_responsibility', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('system_performance_indicators', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('privacy_and_security', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('stakeholder_engagement', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('compliance_in_principles', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('impact_of_ai_system_on_human_rights', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('social_environmental_and_cultural_impact_assessment', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('training_intiatives_for_employees', models.FileField(blank=True, null=True, upload_to='documents/')),
                ('product_type_other', models.TextField(blank=True, null=True)),
                ('license_type_details', models.TextField(blank=True, null=True)),
                ('data_stored_details', models.TextField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='products.company')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.IntegerField()),
                ('submission_date', models.DateTimeField(auto_now_add=True)),
                ('revision_date', models.DateTimeField(auto_now=True)),
                ('document_reviews', models.JSONField()),
                ('comments', models.JSONField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='products.product')),
            ],
        ),
    ]