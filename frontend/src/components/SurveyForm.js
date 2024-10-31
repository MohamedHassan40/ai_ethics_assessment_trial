import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Spinner, Alert } from 'react-bootstrap';

function SurveyForm() {
  console.log("SurveyForm component rendered");

  const initialSurveyData = {
    comments_about_risk_management: '',
    comments_about_transparency_report: '',
    comments_about_fairness_equity: '',
    comments_about_accountability_and_responsibility: '',
    comments_about_system_performance_indicators: '',
    comments_about_privacy_and_security: '',
    comments_about_stakeholder_engagement: '',
    comments_about_compliance_in_principles: '',
    comments_about_impact_of_ai_system_on_human_rights: '',
    comments_about_social_environmental: '',
    comments_about_training_initiatives_for_employees: '',
    general_comments: '',
    improvements: '',
  };

  const [surveyData, setSurveyData] = useState(initialSurveyData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const surveyFields = [
    { label: 'General Comments', name: 'general_comments' },
    { label: 'Improvements', name: 'improvements' },
    { label: 'Comments about Risk Management Document', name: 'comments_about_risk_management' },
    { label: 'Comments about Transparency Report', name: 'comments_about_transparency_report' },
    { label: 'Comments about Fairness and Equity', name: 'comments_about_fairness_equity' },
    { label: 'Comments about Accountability and Responsibility', name: 'comments_about_accountability_and_responsibility' },
    { label: 'Comments about System Performance Indicators', name: 'comments_about_system_performance_indicators' },
    { label: 'Comments about Privacy and Security', name: 'comments_about_privacy_and_security' },
    { label: 'Comments about Stakeholder Engagement', name: 'comments_about_stakeholder_engagement' },
    { label: 'Comments about Compliance in Principles', name: 'comments_about_compliance_in_principles' },
    { label: 'Comments about Impact of AI System on Human Rights', name: 'comments_about_impact_of_ai_system_on_human_rights' },
    { label: 'Comments about Social and Environmental Impact', name: 'comments_about_social_environmental' },
    { label: 'Comments about Training Initiatives for Employees', name: 'comments_about_training_initiatives_for_employees' },

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetSurveyData = () => {
    setSurveyData(initialSurveyData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    axios.post('http://127.0.0.1:8000/api/surveys/', surveyData)
      .then(() => {
        alert('Survey submitted successfully!');
        resetSurveyData();
      })
      .catch((error) => {
        console.error('Error submitting survey:', error);
        setErrorMessage('An error occurred while submitting the survey. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h2>Survey</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            {surveyFields.map((field) => (
              <Form.Group className="mb-3" key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name={field.name}
                  value={surveyData[field.name]}
                  onChange={handleChange}
                  placeholder="Provide your feedback"
                  disabled={isLoading}
                />
              </Form.Group>
            ))}

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Submitting...</> : 'Submit Survey'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SurveyForm;
