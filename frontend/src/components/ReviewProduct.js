import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Accordion, Alert, Table, Spinner } from 'react-bootstrap';
import '../static/ReviewProduct.css'; // Import custom CSS for styling

function ReviewProduct() {
  const [badgeExpiryDate, setbadgeExpiryDate] = useState('');

  const renderList = (items, labelType) => (
    Array.isArray(items) ? (
      <ul className="mb-0">
        {items.map((item, index) => (
          <li key={index}>{getLabel(labelType, item)}</li>
        ))}
      </ul>
    ) : (
      <pre>{JSON.stringify(items, null, 2)}</pre>
    )
  );
  const labelMappings = {
    data_stored: {
      local_cloud: 'Local Cloud',
      international_cloud: 'International Cloud',
      data_center: 'Data Center',
      in_house_servers: 'In-House Servers',
      on_premises: 'On-Premises',
      private_cloud: 'Private Cloud',
      hybrid_cloud: 'Hybrid Cloud',
    },
    update_basis: {
      bugs: 'Bugs',
      feedback: 'Feedback',
      performance_improvements: 'Performance Improvements',
      model_retraining: 'Model Retraining',
      security_patches: 'Security Patches',
      new_features: 'New Features',
    },
    region_area: {
      north_america: 'North America',
      south_america: 'South America',
      europe: 'Europe',
      asia: 'Asia',
      africa: 'Africa',
      middle_east: 'Middle East',
      oceania: 'Oceania',
      global: 'Global',
      eastern_europe: 'Eastern Europe',
      western_europe: 'Western Europe',
      central_america: 'Central America',
      caribbean: 'Caribbean',
      northern_africa: 'Northern Africa',
      southern_africa: 'Southern Africa',
      southeast_asia: 'Southeast Asia',
      east_asia: 'East Asia',
      south_asia: 'South Asia',
      central_asia: 'Central Asia',
      north_east_asia: 'Northeast Asia',
      gulf_region: 'Gulf Region',
    },
    product_status: {
      in_development: 'In Development',
      beta_testing: 'Beta Testing',
      available_for_sale: 'Available for Sale',
      on_hold: 'On Hold',
      discontinued: 'Discontinued',
      pilot_program: 'Pilot Program',
      scaling: 'Scaling',
      maintenance_mode: 'Maintenance Mode',
      closed_beta: 'Closed Beta',
      public_beta: 'Public Beta',
      prototype: 'Prototype',
      mvp: 'Minimum Viable Product (MVP)',
      pre_launch: 'Pre-Launch',
      retired: 'Retired',
      limited_availability: 'Limited Availability',
      research_stage: 'Research Stage',
    },
    development_roles: {
      developers_only: 'Developers only',
      developers_and_non_developers: 'Developers and non-developers',
      project_managers: 'Project Managers',
      product_owners: 'Product Owners',
      data_scientists: 'Data Scientists',
      data_analysts: 'Data Analysts',
      UIUX_Designers: 'UI/UX Designers',
      devOps_engineers: 'DevOps Engineers',
      quality_assurance_engineers: 'Quality Assurance Engineers',
      business_analysts: 'Business Analysts',
      system_architects: 'System Architects',
      technical_writers: 'Technical Writers',
      machine_learning_engineers: 'Machine Learning Engineers',
      cybersecurity_specialists: 'Cybersecurity Specialists',
      database_administrators: 'Database Administrators',
      network_engineers: 'Network Engineers',
      frontend_developers: 'Frontend Developers',
      backend_developers: 'Backend Developers',
      full_stack_developers: 'Full Stack Developers',
      mobile_app_developers: 'Mobile App Developers',
      game_developers: 'Game Developers',
      cloud_engineers: 'Cloud Engineers',
    },
    license_type: {
      saas: 'Software as a Service (SaaS)',
      user_based: 'User-Based Licensing',
      transaction_based: 'Transaction-Based Licensing',
      on_premises: 'On Premises',
      open_source: 'Open Source',
  
    },
    clients: {
      government: 'Government',
      private: 'Private Sector',
      individuals: 'Individuals',
    },
    product_language: {
      'Arabic': 'Arabic',
      'English': 'English',
      'Spanish': 'Spanish',
      'French': 'French',
      'German': 'German',
      'Chinese': 'Chinese',
      'Japanese': 'Japanese',
      'Korean': 'Korean',
      'Portuguese': 'Portuguese',
      'Russian': 'Russian',
      'Italian': 'Italian',
      'Hindi': 'Hindi',
      'Turkish': 'Turkish',
      'Dutch': 'Dutch',
      'Swedish': 'Swedish',
      'Danish': 'Danish',
      'Norwegian': 'Norwegian',
      'Finnish': 'Finnish',
      'Thai': 'Thai',
      'Vietnamese': 'Vietnamese',
      'Bengali': 'Bengali',
      'Malay': 'Malay',
      'Arabic and English': 'Arabic and English', // if needed
    },
    product_sector: {
      'Finance': 'Finance',
      'Agriculture': 'Agriculture',
      'Supply Chain': 'Supply Chain',
      'Healthcare': 'Healthcare',
      'Retail': 'Retail',
      'Manufacturing': 'Manufacturing',
      'Telecommunications': 'Telecommunications',
      'Transportation': 'Transportation',
      'Education': 'Education',
      'Energy': 'Energy',
      'Entertainment': 'Entertainment',
      'Real Estate': 'Real Estate',
      'Marketing': 'Marketing',
      'Legal': 'Legal',
      'Human Resources': 'Human Resources',
      'Cybersecurity': 'Cybersecurity',
      'Travel and Hospitality': 'Travel and Hospitality',
    },
    product_type: {
      'Recommender': 'Recommender',
      'Decision Assistant': 'Decision Assistant',
      'Chatbot': 'Chatbot',
      'Image Recognition': 'Image Recognition',
      'Natural Language Processing': 'NLP', // updated label
      'Speech Recognition': 'Speech Recognition',
      'Sentiment Analysis': 'Sentiment Analysis',
      'Predictive Analytics': 'Predictive Analytics',
      'Fraud Detection': 'Fraud Detection',
      'Automated Transcription': 'Automated Transcription',
      'Voice Assistant': 'Voice Assistant',
      'Computer Vision': 'Computer Vision',
      'Text Generation': 'Text Generation',
      'Language Translation': 'Language Translation',
      'Augmented Reality': 'Augmented Reality',
      'Robotic Process Automation': 'Robotic Process Automation',
      'Time Series Analysis': 'Time Series Analysis',
    }
  };

  const getLabel = (type, value) => labelMappings[type]?.[value] || value;
  const { id } = useParams();
  const navigate = useNavigate(); // Used for navigation after submission
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState({
    documentReviews: {},
    comments: {},
    isAccepted: false,
  });
  const [loading, setLoading] = useState(true);
  const [finalScore, setFinalScore] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [documentFields, setDocumentFields] = useState([]);  // Initialize as an empty array

  useEffect(() => {
    // Fetch document fields from JSON file
    axios.get('/documentFields.json')
      .then(response => {
        setDocumentFields(response.data);  // Set documentFields data from the JSON response
      })
      .catch(error => {
        console.error('Error fetching document fields:', error);
      });
  }, []); // Close the useEffect for documentFields

  useEffect(() => {
    if (documentFields && documentFields.length > 0) {
      axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
        .then(response => {
          const productData = response.data;
          const defaultReview = {};
          const defaultComments = {};
  
          documentFields.forEach(doc => {
            defaultReview[doc.name] = {};
            doc.requirements.forEach(criteria => {
              defaultReview[doc.name][criteria.requirement] = {
                pageNumber: productData.document_reviews?.[doc.name]?.[criteria.requirement]?.pageNumber || 0,
                achieved: productData.document_reviews?.[doc.name]?.[criteria.requirement]?.achieved || false,
              };
              if (criteria.subParts) {
                criteria.subParts.forEach(subPart => {
                  defaultReview[doc.name][criteria.requirement][subPart.name] = productData[doc.name]?.[criteria.requirement]?.[subPart.name] || false;
                });
              }
            });
            defaultComments[doc.name] = '';  // Initialize comments as empty strings
          });
  
          setProduct(productData);
          setReview({
            documentReviews: defaultReview,  // Use the defaultReview that has achieved set by default
            comments: defaultComments,
            isAccepted: productData.is_accepted || false,
          });
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setError('Failed to load product details.');
        })
        .finally(() => setLoading(false));
    }
  }, [id, documentFields]);
  

  const handleCheckChange = (docName, criteriaName, subPartName, value) => {
    setReview((prevReview) => {
      const updatedDocumentReviews = { ...prevReview.documentReviews };
      if (!updatedDocumentReviews[docName]) {
        updatedDocumentReviews[docName] = {};
      }
      if (!updatedDocumentReviews[docName][criteriaName]) {
        updatedDocumentReviews[docName][criteriaName] = {};
      }
      updatedDocumentReviews[docName][criteriaName].achieved = value;
  
      return {
        ...prevReview,
        documentReviews: updatedDocumentReviews,
      };
    });
  };
  
  
  

  const handleCommentChange = (docName, value) => {
    setReview(prevReview => ({
      ...prevReview,
      comments: {
        ...prevReview.comments,
        [docName]: value,
      }
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
  

  
    
  
    const data = {
      product: id,
      version: 1,  // Adjust if handling multiple versions
      document_reviews: review.documentReviews,
      comments: review.comments,

    };
  
    console.log('Data being submitted:', data); // Add this line to verify the structure
  
    axios.post('http://127.0.0.1:8000/api/reviews/', data)
      .then(response => {
        const score = response.data.final_score;
        setFinalScore(score);
        alert('Review added successfully!');
        setSuccess(`Review submitted successfully! Final Score: ${score}%`);
        setSubmitting(false);
      })
      .catch(error => {
        console.error('There was an error submitting the review:', error.response ? error.response.data : error);
        setError(`Error: ${error.response ? JSON.stringify(error.response.data) : 'An error occurred.'}`);
        setSubmitting(false);
      });
  };
  
  
  if (loading) {
    return (
      <div className="review-product-container text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-product-container mt-5">
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="review-product-container mt-5">
        <Alert variant="warning">
          Product not found.
        </Alert>
      </div>
    );
  }
  
  const getDocumentURL = (docName) => {
    // Create the field name from the docName
    const fieldName = docName.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
    console.log('Trying to access:', fieldName); // Debug line

    // If the product doesn't have the key directly, you might need to manipulate it
    const url = product[fieldName] || product[docName.replace(/ /g, '_').toLowerCase()] || null;
    
    return url;
};



  const handlePageNumberChange = (docName, criteriaName, value) => {
    setReview(prevReview => {
      const updatedDocumentReviews = { ...prevReview.documentReviews };
      updatedDocumentReviews[docName][criteriaName] = {
        ...updatedDocumentReviews[docName][criteriaName],
        pageNumber: value,  // Update the page number
      };
  
      return {
        ...prevReview,
        documentReviews: updatedDocumentReviews,
      };
    });
  };
  
  return (
    <div className="container mt-4 review-product-container">
      <Card className="review-product-card">

        
        <Card.Body>
          <h2>Reviewing: {product.name}</h2>
          <h5>Company: {product.company_name}</h5>
          <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <td><strong>Description</strong></td>
              <td>{product.description}</td>
            </tr>
            <tr>
              <td><strong>What challenges does the product solve</strong></td>
              <td>{product.challenge_addressed}</td>
            </tr>
            <tr>
              <td><strong>User Guide Link</strong></td>
              <td>
                <a href={product.user_guide_link} target="_blank" rel="noopener noreferrer">
                  {product.user_guide_link}
                </a>
              </td>
            </tr>
            <tr>
              <td><strong>Update Frequency</strong></td>
              <td>{product.update_frequency}</td>
            </tr>
            <tr>
              <td><strong>Data Source</strong></td>
              <td>{product.data_source}</td>
            </tr>
            <tr>
              <td><strong>Model Training Data Size</strong></td>
              <td>{product.model_training_data_size}</td>
            </tr>
            <tr>
              <td><strong>Number of Employees</strong></td>
              <td>{product.number_of_employees}</td>
            </tr>
            <tr>
              <td><strong>Product Language</strong></td>
              <td>{renderList(product.product_language, 'product_language')}</td>
            </tr>
            <tr>
              <td><strong>Product Sector</strong></td>
              <td>{renderList(product.product_sector, 'product_sector')}</td>
            </tr>
            <tr>
              <td><strong>Product Type</strong></td>
              <td>{renderList(product.product_type, 'product_type')}</td>
            </tr>
            <tr>
              <td><strong>Other Product Type</strong></td>
              <td>{product.product_type_other}</td>
            </tr>
            <tr>
              <td><strong>Update Basis</strong></td>
              <td>{renderList(product.update_basis, 'update_basis')}</td>
            </tr>
            <tr>
      <td><strong>Regions Served</strong></td>
      <td>{renderList(product.region, 'region_area')}</td>
    </tr>
    <tr>
      <td><strong>Current Product Status</strong></td>
      <td>{getLabel('product_status', product.product_status)}</td>
      </tr>
            <tr>
              <td><strong>Development Roles</strong></td>
              <td>{renderList(product.development_roles, 'development_roles')}</td>
            </tr>
            <tr>
              <td><strong>Data Stored</strong></td>
              <td>{renderList(product.data_stored, 'data_stored')}</td>
            </tr>
            <tr>
              <td><strong>Server Details</strong></td>
              <td>{product.data_stored_details}</td>
            </tr>
            <tr>
              <td><strong>License Type</strong></td>
              <td>{renderList(product.license_type, 'license_type')}</td>
            </tr>
            <tr>
              <td><strong>License Type Details</strong></td>
              <td>{product.license_type_details}</td>
            </tr>
            <tr>
              <td><strong>Clients</strong></td>
              <td>{renderList(product.clients, 'clients')}</td>
            </tr>
            <tr>
              <td><strong>Top Clients</strong></td>
              <td>{renderList(product.top_clients, 'top_clients')}</td>
            </tr>
            <tr>
              <td><strong>Number of Clients</strong></td>
              <td>{product.number_of_clients}</td>
            </tr>
            <tr>
              <td><strong>Product Launch Date</strong></td>
              <td>{product.product_launch_date}</td>
            </tr>


          </tbody>
        </Table>

          {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
          {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* Document Reviews Accordion */}
            {documentFields && documentFields.length > 0 ? (
  <Accordion defaultActiveKey="0" className="mb-4">
    {documentFields.map((doc, index) => (
      <Accordion.Item eventKey={index.toString()} key={doc.name}>
        <Accordion.Header>{doc.title}</Accordion.Header>
        <Accordion.Body>
          <div>
            <h6>Criteria to Assess:</h6>
            {getDocumentURL(doc.title) ? (
                      <div className="mb-3">
                        <h6>{doc.title} Document:</h6>
                        <iframe
                          src={getDocumentURL(doc.title)}
                          width="100%"
                          height="600px"
                          title={doc.title}
                          style={{ border: '1px solid #ccc' }}
                        ></iframe>
                      </div>
                    ) : (
                      <Alert variant="warning">Document is not uploaded.</Alert>
                    )}
            <Table bordered hover responsive>
              <thead className="table-primary">
                <tr>
                  <th>Requirement</th>
                  <th>Expected</th>
                  <th>Marks</th>
                  <th>Page Number</th>
                  <th>Achieved</th>
                </tr>
              </thead>
<tbody>
  {doc.requirements.map((criteria, reqIndex) => (
    <tr key={reqIndex}>
      <td>{criteria.requirement}</td>
      <td>{criteria.expected}</td>
      <td>{criteria.marks}</td>
      <td>
        {/* Access the pageNumber in the nested object */}
        {review.documentReviews[doc.name]?.[criteria.requirement]?.pageNumber ?? '0'}
        </td>
      <td>
        <Form.Check
          type="checkbox"
          checked={review.documentReviews[doc.name]?.[criteria.requirement]?.achieved ?? false}
          onChange={(e) => handleCheckChange(doc.name, criteria.requirement, null, e.target.checked)}
          />
      </td>
    </tr>
  ))}
</tbody>




            </Table>
            <Form.Group className="mb-3">
              <Form.Label>Comments on {doc.title}</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={`Enter comments for ${doc.title}`}
                value={review.comments[doc.name] || ''}
                onChange={(e) => handleCommentChange(doc.name, e.target.value)}
                rows={2}
              />
            </Form.Group>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
) : (
  <Alert variant="warning">No document fields available.</Alert>
)}




            {/* Submit Button */}
            <Button variant="success" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> Submitting...
                </>
              ) : 'Submit Review'}
            </Button>
          </Form>
        </Card.Body>


      </Card>


    </div>
  );
}

export default ReviewProduct;
