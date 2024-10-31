from django.db import models
from datetime import datetime
from django.core.exceptions import ValidationError



class Survey(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    # Fields for comments about each document
    comments_about_risk_management = models.TextField(blank=True, null=True)
    comments_about_transparency_report = models.TextField(blank=True, null=True)
    comments_about_fairness_equity = models.TextField(blank=True, null=True)
    comments_about_accountability_and_responsibility = models.TextField(blank=True, null=True)
    comments_about_system_performance_indicators = models.TextField(blank=True, null=True)
    comments_about_privacy_and_security = models.TextField(blank=True, null=True)
    comments_about_stakeholder_engagement = models.TextField(blank=True, null=True)
    comments_about_compliance_in_principles = models.TextField(blank=True, null=True)
    comments_about_impact_of_ai_system_on_human_rights = models.TextField(blank=True, null=True)
    comments_about_social_environmental = models.TextField(blank=True, null=True)
    comments_about_training_initiatives_for_employees = models.TextField(blank=True, null=True)

    # General feedback fields
    general_comments = models.TextField(blank=True, null=True)
    improvements = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Survey {self.id} - {self.created_at.strftime("%Y-%m-%d")}'
    
    
    
class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    company_url = models.CharField(max_length=255)
    company_size = models.CharField(max_length=255)

    def __str__(self):
        return self.name





class Product(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField()
    challenge_addressed = models.TextField()
    user_guide_link = models.URLField(max_length=200)
    product_language = models.JSONField()  # Assuming languages are static for now
    product_sector = models.JSONField()
    final_score = models.FloatField(default=0.0)
    update_frequency = models.CharField(max_length=100)
    update_basis = models.JSONField()  # If this is still meant to be a list of strings, keep as JSONField
    development_roles = models.JSONField()
    product_type = models.JSONField()
    number_of_employees = models.CharField(max_length=100)
    data_source = models.TextField()
    model_training_data_size = models.CharField(max_length=100)
    document_reviews = models.JSONField(default=dict)
    data_stored =models.JSONField()
    region= models.JSONField()
    product_status=models.TextField()    
    license_type = models.JSONField()
    clients = models.JSONField()  # Keeping as JSON for client types (e.g., government, private)
    number_of_clients = models.IntegerField(null=True, blank=True)
    top_clients = models.JSONField()  # List of top clients stored as JSON
    product_launch_date = models.DateField()
    risk_management = models.FileField(upload_to='documents/', blank=True, null=True)
    transparency_report = models.FileField(upload_to='documents/', blank=True, null=True)
    fairness_equity = models.FileField(upload_to='documents/', blank=True, null=True)
    accountability_and_responsibility = models.FileField(upload_to='documents/', blank=True, null=True)
    system_performance_indicators = models.FileField(upload_to='documents/', blank=True, null=True)
    privacy_and_security = models.FileField(upload_to='documents/', blank=True, null=True)
    stakeholder_engagement = models.FileField(upload_to='documents/', blank=True, null=True)
    compliance_in_principles = models.FileField(upload_to='documents/', blank=True, null=True)
    impact_of_ai_system_on_human_rights = models.FileField(upload_to='documents/', blank=True, null=True)
    social_environmental_and_cultural_impact_assessment = models.FileField(upload_to='documents/', blank=True, null=True)
    training_intiatives_for_employees = models.FileField(upload_to='documents/', blank=True, null=True)
    
    product_type_other = models.TextField(blank=True, null=True)
    license_type_details = models.TextField(blank=True, null=True)
    data_stored_details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name



class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    version = models.IntegerField()
    submission_date = models.DateTimeField(auto_now_add=True)
    revision_date = models.DateTimeField(auto_now=True)
    document_reviews = models.JSONField()
    comments = models.JSONField()

    # Define the marks for each requirement
    REQUIREMENT_MARKS ={
    'Risk Management': {
        'description': 'Document outlining the system risk assessment and potential risk management plan associated with the system, including defining risk levels and measurement tools.',
        'totalMarks': 15,
        'requirements': [
            {
                'name': 'High-risk AI and Low-risk AI Definition',
                'accepted': 'Document defining high-risk and low-risk AI systems with examples.',
                'description': 'The definitions adopted by your respective organization for high-risk AI systems and low-risk AI systems. Should clearly define criteria for high-risk and low-risk AI systems. Should provide examples of each category to illustrate the differences.',
                'marks': 3
            },
            {
                'name': 'AI System Categorization',
                'accepted': 'Categorization document or matrix.',
                'description': 'A document categorizing AI systems provided by your respective organization with regards to high vs low risk AI. Should detail the categorization methodology used by the organization, including criteria and processes for categorizing AI systems. Include a classification matrix or decision tree.',
                'marks': 3
            },
            {
                'name': 'Risk Assessment Reports',
                'accepted': 'Report identifying potential risks and assessment methods.',
                'description': 'Identification of potential risks (technical, ethical, operational) and the methods used to assess their likelihood and impact. Should include a risk matrix or similar tool to visualize risk levels.',
                'marks': 3
            },
            {
                'name': 'Mitigation Plans',
                'accepted': 'Document detailing strategies and actions for risk mitigation.',
                'description': 'Strategies and actions taken to minimize identified risks. This should detail the timeline, responsible parties, and specific measures implemented per risk.',
                'marks': 3
            },
            {
                'name': 'Safety Validation and Testing Documentation',
                'accepted': 'Testing results and methodologies document.',
                'description': 'Results from safety testing, including scenarios tested, methodologies used, outcomes, and any modifications made to enhance safety.',
                'marks': 1
            },
            {
                'name': 'Performance Monitoring Logs',
                'accepted': 'Logs of ongoing monitoring activities.',
                'description': 'Records of ongoing monitoring activities, performance metrics, and any corrective actions taken in response to issues or deviations from expected performance. Should include frequency of monitoring and reporting structures.',
                'marks': 1
            },
            {
                'name': 'Stress Test Documentation',
                'accepted': 'Documentation of stress tests and results.',
                'description': 'Details on test cases designed to challenge the AI system under extreme or unexpected conditions, results from these tests, and how findings were addressed. Include sample results from these tests, analyses of system responses, and how findings were addressed.',
                'marks': 1
            }
        ]
    },
    'Transparency Report': {
        'description': 'Report explaining how transparency is achieved, including clear and understandable interpretations of the system\'s functioning and the reasons behind its outcomes.',
        'totalMarks': 13,
        'requirements': [
            {
                'name': 'Transparency Log',
                'accepted': 'Document explaining model architecture and data sources.',
                'description': 'Explanations of the AI model’s architecture, data sources, algorithms, and decision-making processes. Should also cover any limitations and uncertainties associated with the model.',
                'marks': 3
            },
            {
                'name': 'Algorithm Documentation',
                'accepted': 'Detailed algorithm descriptions and model cards.',
                'description': 'Detailed descriptions of the algorithms used, including model types, training data characteristics, and parameter settings. Include model cards that summarize this information.',
                'marks': 3
            },
            {
                'name': 'User Guides/Manuals',
                'accepted': 'Guides for non-technical stakeholders.',
                'description': 'Guides designed for non-technical stakeholders to understand how to interpret AI system outputs, including visual aids and simplified explanations of the AI\'s functionality.',
                'marks': 3
            },
            {
                'name': 'AI Methods Explanation',
                'accepted': 'Report explaining AI system behavior and reliability.',
                'description': 'The report should explain the behavior of the system as well as ensure the deployment of reliable technology. The report should help to better understand the AI system’s underlying mechanism as well as the interpretation of the outcomes.',
                'marks': 3
            },
            {
                'name': 'Internal Audit Logs',
                'accepted': 'Logs for tracing decisions.',
                'description': 'Records that allow tracing decisions back to their data sources and algorithms, including timestamps, data points used, and any intermediate processing steps.',
                'marks': 1
            }
        ]
    },
    'Fairness & Equity': {
        'description': 'Document outlining the strategy to ensure fairness in the use of the AI system to avoid bias among user groups.',
        'totalMarks': 12,
        'requirements': [
            {
                'name': 'Diversity and Inclusion Analysis',
                'accepted': 'Analysis of training dataset representativeness.',
                'description': 'Section detailing the representativeness of training datasets, including demographic breakdowns and assessments of potential biases. Should also discuss steps taken to mitigate any identified biases.',
                'marks': 3
            },
            {
                'name': 'Bias Detection and Mitigation',
                'accepted': 'Document detailing methodologies for bias detection.',
                'description': 'Section detailing methodologies and tools used for detecting bias in AI models and datasets (e.g., fairness metrics, debiasing algorithms). Should include specific steps for mitigating identified biases.',
                'marks': 3
            },
            {
                'name': 'Fairness Metrics Documentation',
                'accepted': 'Documentation of fairness metrics and calculation methods.',
                'description': 'Metrics used to assess fairness, such as disparate impact or equalized odds, and the methods used to calculate these metrics. Include thresholds for acceptable levels of fairness.',
                'marks': 3
            },
            {
                'name': 'Internal Audit Reports',
                'accepted': 'Reports evaluating fairness and detecting biases.',
                'description': 'Findings from periodic audits that evaluate fairness and detect biases in AI outcomes. Should include methodologies used, results, corrective actions, and follow-up measures.',
                'marks': 1
            },
            {
                'name': 'AI Fairness Position Statement',
                'accepted': 'Statement outlining fairness criteria.',
                'description': 'A fairness position statement communicates the fairness criteria and ethical standards of an AI system in clear language, explaining the rationale behind these choices.',
                'marks': 2
            }
        ]
    },
    'Accountability and Responsibility': {
        'description': 'Document detailing the governance and emergency plan to abort or intervene in the AI system when it doesn’t function as intended or leads to unsafe practices.',
        'totalMarks': 7,
        'requirements': [
            {
                'name': 'Organizational Charts',
                'accepted': 'Organizational structure document.',
                'description': 'Should include all roles involved in AI development, deployment, and oversight. Should highlight clear lines of authority and accountability.',
                'marks': 2
            },
            {
                'name': 'Accountability Mechanisms',
                'accepted': 'Documentation of accountability mechanisms.',
                'description': 'Provide mechanisms for holding individuals and teams accountable for AI system outcomes. Include internal and external review processes, performance evaluations, and corrective action plans.',
                'marks': 2
            },
            {
                'name': 'Human Intervention Protocols',
                'accepted': 'Protocols outlining human intervention guidelines.',
                'description': 'Guidelines and procedures outlining when and how human intervention is necessary, the process for escalating decisions to human supervisors, and criteria for overriding AI decisions.',
                'marks': 2
            },
            {
                'name': 'Incident Reports',
                'accepted': 'Reports documenting incidents of oversight.',
                'description': 'Detailed descriptions of incidents where human oversight was applied, including the context, actions taken, and outcomes.',
                'marks': 1
            }
        ]
    },
    'System Performance Indicators': {
        'description': 'Report containing performance indicators used in the system to ensure the safety and reliability of the system and the responsibilities of the relevant parties.',
        'totalMarks': 9,
        'requirements': [
            {
                'name': 'List of Performance Indicators',
                'accepted': 'KPI documentation related to safety and reliability.',
                'description': 'KPIs related to safety and reliability, such as accuracy rates, response times, system uptime, error rates, and failure rates. Should define key performance indicators (KPIs) used to measure AI system performance.',
                'marks': 2
            },
            {
                'name': 'Measurement Methodology',
                'accepted': 'Explanation of how KPIs are measured.',
                'description': 'Detailed explanation of how each KPI is measured, including the data sources used, frequency of measurement, and tools or methods for data collection and analysis.',
                'marks': 2
            },
            {
                'name': 'Test Results and Analysis',
                'accepted': 'Summarized results of safety tests.',
                'description': 'Summarized results of safety tests, including any failures, anomalies, or unexpected behaviors. Provide analysis of what the results indicate about the system’s reliability.',
                'marks': 1
            },
            {
                'name': 'Validation Protocols',
                'accepted': 'Protocols for validating safety and reliability.',
                'description': 'Protocols used to validate that the system meets safety and reliability requirements, including any external audits or certifications obtained.',
                'marks': 2
            },
            {
                'name': 'Monitoring Tools and Techniques',
                'accepted': 'Description of monitoring tools.',
                'description': 'Description of the tools and techniques used for continuous monitoring of system performance.',
                'marks': 1
            },
            {
                'name': 'Stakeholder Responsibilities',
                'accepted': 'Document detailing stakeholder roles.',
                'description': 'Roles of different stakeholders (e.g., developers, operators, maintenance teams) in maintaining and improving system reliability.',
                'marks': 1
            }
        ]
    },
    'Privacy and Security': {
        'description': 'Report on compliance with local or international data privacy and protection regulations, data classification policies, and control measures used, and any procedures to be followed to ensure compliance with related regulations and policies.',
        'totalMarks': 9,
        'requirements': [
            {
                'name': 'Data Privacy Impact Assessments',
                'accepted': 'Evaluations identifying potential privacy risks.',
                'description': 'Evaluations of how personal data is processed, identifying potential privacy risks and outlining measures to mitigate them.',
                'marks': 2
            },
            {
                'name': 'Data Privacy and Security Policies',
                'accepted': 'Document outlining data protection policies.',
                'description': 'Detailed descriptions of policies and practices for protecting data against unauthorized access, breaches, and misuse.',
                'marks': 2
            },
            {
                'name': 'Incident Response Plan',
                'accepted': 'Detailed incident response plan document.',
                'description': 'Provide a detailed plan for responding to data breaches or other privacy incidents.',
                'marks': 2
            },
            {
                'name': 'Anonymization and Pseudonymization Methods',
                'accepted': 'Documentation of anonymization methods.',
                'description': 'Documentation of methods used to remove or obscure personal identifiers in data.',
                'marks': 1
            },
            {
                'name': 'Compliance with Regulatory Landscape',
                'accepted': 'List of relevant regulations and standards.',
                'description': 'List of relevant data privacy regulations and standards the organization complies with.',
                'marks': 1
            },
            {
                'name': 'Data Access Logs',
                'accepted': 'Logs of data access records.',
                'description': 'Records of who accessed data, when, and for what purpose.',
                'marks': 1
            }
        ]
    },
    'Stakeholder Engagement': {
        'description': 'Report explaining stakeholder engagement and the responsibilities associated with the system and the responsible parties.',
        'totalMarks': 7,
        'requirements': [
            {
                'name': 'Stakeholder Identification and Analysis',
                'accepted': 'List of stakeholders involved or impacted.',
                'description': 'List of all stakeholders involved or impacted by the AI system. Include a stakeholder mapping to categorize them based on their influence and interest.',
                'marks': 2
            },
            {
                'name': 'Engagement Methods',
                'accepted': 'Description of engagement methods used.',
                'description': 'Description of the different methods used to engage stakeholders, such as surveys, focus groups, workshops.',
                'marks': 2
            },
            {
                'name': 'Feedback Analysis',
                'accepted': 'Analysis of stakeholder feedback.',
                'description': 'Analysis of the feedback to identify key areas for improvement, risks, or opportunities.',
                'marks': 2
            },
            {
                'name': 'Stakeholder MoMs (sanitized)',
                'accepted': 'Sample records of stakeholder meetings.',
                'description': 'Sample records of meetings or consultations held with stakeholders, providing transparency and accountability.',
                'marks': 1
            }
        ]
    },
    'Compliance with Principles': {
        'description': 'Report on compliance or results of ethical AI audits against AI ethics principles or any global standards.',
        'totalMarks': 10,
        'requirements': [
            {
                'name': 'Compliance Framework',
                'accepted': 'Outline of ethical principles and standards.',
                'description': 'Outline of the ethical principles and global standards that the AI system currently complies with.',
                'marks': 2
            },
            {
                'name': 'Standards Referenced',
                'accepted': 'List of referenced global standards.',
                'description': 'List of the global standards referenced in the compliance framework, such as ISO/IEC standards, IEEE guidelines.',
                'marks': 1
            },
            {
                'name': 'Alignment Evidence',
                'accepted': 'Document detailing evidence of compliance.',
                'description': 'Document detailing evidence of how the AI system meets or exceeds the requirements of each referenced standard.',
                'marks': 2
            },
            {
                'name': 'Compliance Certification',
                'accepted': 'Information on compliance certifications.',
                'description': 'Information on any certifications or recognitions obtained based on compliance to global or regional ethics principles.',
                'marks': 1
            },
            {
                'name': 'Compliance Audits and Reviews',
                'accepted': 'Process documentation for audits and reviews.',
                'description': 'Section outlining the process for conducting regular audits and reviews to assess compliance with ethical standards.',
                'marks': 2
            },
            {
                'name': 'Monitoring Activities',
                'accepted': 'Overview of compliance monitoring activities.',
                'description': 'Overview of regular activities conducted to monitor compliance with ethical principles.',
                'marks': 2
            }
        ]
    },
    'Impact of AI System on Human Rights': {
        'description': 'Human rights impact assessment report and the measurement mechanism used.',
        'totalMarks': 6,
        'requirements': [
            {
                'name': 'Human Rights Impact Assessments',
                'accepted': 'Reports detailing potential human rights impacts.',
                'description': 'Reports detailing the potential impact of the AI system on human rights.',
                'marks': 2
            },
            {
                'name': 'Stakeholder Consultation Reports',
                'accepted': 'Records of consultations on human rights impacts.',
                'description': 'Records of consultations with stakeholders on human rights impacts.',
                'marks': 1
            },
            {
                'name': 'Monitoring and Reporting on Human Rights Impacts',
                'accepted': 'Plan for ongoing monitoring and reporting.',
                'description': 'Plan for ongoing monitoring and reporting of human rights impacts.',
                'marks': 2
            },
            {
                'name': 'Mitigation Plans',
                'accepted': 'Documentation of strategies addressing human rights risks.',
                'description': 'Documentation of strategies to address any identified human rights risks, including timelines and responsibilities.',
                'marks': 1
            }
        ]
    },
    'Social, Environmental, and Cultural Impact Assessment': {
        'description': 'Reports assessing the social, environmental, and cultural impact of the AI system.',
        'totalMarks': 5,
        'requirements': [
            {
                'name': 'Impact Evaluation',
                'accepted': 'Assessments of various impacts.',
                'description': 'Assessments of how the AI system affects various social, environmental, and cultural factors.',
                'marks': 2
            },
            {
                'name': 'Mitigation Strategy',
                'accepted': 'Plans and actions to minimize adverse impacts.',
                'description': 'Plans and actions taken to minimize any adverse impacts identified in the impact evaluations.',
                'marks': 2
            },
            {
                'name': 'List of Identified Impacts',
                'accepted': 'List and description of negative impacts.',
                'description': 'List and description of all negative impacts identified in the Impact Assessment Report.',
                'marks': 1
            }
        ]
    },
    'Training Initiatives for Employees': {
        'description': 'Report showing the regular training provided to employees on AI risks and ethics, including the frequency of these training sessions.',
        'totalMarks': 7,
        'requirements': [
            {
                'name': 'Training Session Records',
                'accepted': 'Logs of training sessions.',
                'description': 'Detailed logs of training sessions, including dates, attendees, materials used, and session objectives.',
                'marks': 2
            },
            {
                'name': 'Training Program Overview',
                'accepted': 'Overview of training content.',
                'description': 'Breakdown of the content covered in each training session.',
                'marks': 2
            },
            {
                'name': 'Presentation Slides',
                'accepted': 'Slides or materials used during training.',
                'description': 'Provide presentation slides, videos, or recorded sessions used during training.',
                'marks': 1
            },
            {
                'name': 'Certification Records',
                'accepted': 'Documentation proving training completion.',
                'description': 'Documentation proving that employees have completed mandatory training on AI ethics and risk management.',
                'marks': 1
            },
            {
                'name': 'Attendance Records',
                'accepted': 'Records of employee attendance.',
                'description': 'Records of employee attendance at each training session.',
                'marks': 1,
            }
        ]
    },


    }
    def calculate_final_score(self):
        total_marks = 0
        achieved_marks = 0

        # Loop through each document's requirements and calculate marks
        for doc, criteria in self.REQUIREMENT_MARKS.items():
            for criterion in criteria['requirements']:
                total_marks += criterion['marks']  # Add total possible marks for this criterion
                
                # Get the reviews for this document and requirement
                doc_reviews = self.document_reviews.get(doc, {}).get(criterion['name'], {})

                # Explicitly check if the 'achieved' key is set to True
                achieved = doc_reviews.get('achieved', False)
                if achieved:
                    achieved_marks += criterion['marks']

        # Ensure no division by zero
        if total_marks == 0:
            return 0.0

        # Calculate the final score as a percentage
        final_score = (achieved_marks / total_marks) * 100
        return round(final_score, 2)


    def save(self, *args, **kwargs):
        # Calculate and update the final score before saving
        self.product.final_score = self.calculate_final_score()
        self.product.save(update_fields=['final_score'])  # Ensure only the 'final_score' is updated
        if not self.pk:
            last_review = Review.objects.filter(product=self.product).order_by('-version').first()
            self.version = last_review.version + 1 if last_review else 1
        super(Review, self).save(*args, **kwargs)