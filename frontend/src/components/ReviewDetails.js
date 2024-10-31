import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Table, Button, Alert, Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import '../static/ReviewDetails.css'; // Import the CSS file

function ReviewDetails() {
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
      on_premises:'On Premises',
      user_based: 'User-Based Licensing',
      transaction_based: 'Transaction-Based Licensing',
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
  const [review, setReview] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [documentFields, setDocumentFields] = useState([]);

  useEffect(() => {
    const fetchDocumentFields = async () => {
      try {
        const response = await axios.get('/documentFields.json');
        setDocumentFields(response.data);
      } catch (err) {
        console.error('Error fetching document fields:', err);
      }
    };

    const fetchReviewAndProduct = async () => {
      try {
        const reviewResponse = await axios.get(`http://127.0.0.1:8000/api/reviews/${id}/`);
        setReview(reviewResponse.data);

        const productId = reviewResponse.data.product;
        const productResponse = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
        setProduct(productResponse.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load review or product details.');
        setLoading(false);
      }
    };

    fetchDocumentFields();
    fetchReviewAndProduct();
  }, [id]);

  const calculateTotalMarks = (docName) => {
    const docField = documentFields.find(doc => doc.name === docName);
    if (!docField) return { achieved: 0, total: 0 };

    const total = docField.requirements.reduce((acc, criteria) => acc + criteria.marks, 0);
    let achieved = 0;
    docField.requirements.forEach(criteria => {
      const criteriaReview = review.document_reviews[docName]?.[criteria.requirement];
      if (criteriaReview && criteriaReview.achieved) {
        achieved += criteria.marks;
      }
    });

    return { achieved, total };
  };

  const getCheckedCriteriaCount = (docName) => {
    if (!review || !review.document_reviews || !review.document_reviews[docName]) {
      return { checkedCount: 0, totalCount: 0 };
    }

    const criteriaList = documentFields.find(doc => doc.name === docName)?.requirements || [];
    let checkedCount = 0;
    criteriaList.forEach(criteria => {
      const isChecked = review.document_reviews[docName]?.[criteria.requirement]?.achieved === true;
      if (isChecked) {
        checkedCount++;
      }
    });
    return { checkedCount, totalCount: criteriaList.length };
  };

  const calculateFinalScore = () => {
    let totalAchieved = 0;
    let totalPossible = 0;
    documentFields.forEach(doc => {
      const { achieved, total } = calculateTotalMarks(doc.name);
      totalAchieved += achieved;
      totalPossible += total;
    });

    const percentage = totalPossible === 0 ? 0 : ((totalAchieved / totalPossible) * 100).toFixed(2);
    return { totalAchieved, totalPossible, percentage };
  };

  const formatField = (field) => {
    if (Array.isArray(field)) {
      return field.join(', ');
    }
    return field || 'N/A';
  };

  const handleExportPDF = async () => {
    if (!review || !product) return;
    setExporting(true);
  
    // Initialize the jsPDF document
    const doc = new jsPDF('p', 'mm', 'a4');
    const productName = product.name || 'N/A';
    const companyName = product.company_name || 'N/A';
    const { totalAchieved, totalPossible, percentage } = calculateFinalScore();
    const revisionDate = review.revision_date
      ? format(new Date(review.revision_date), 'MM/dd/yyyy h:mm a')
      : 'N/A';

      let scoreColor = '#606469'; // Default color for scores below 40%
      if (percentage >= 85) scoreColor = '#02A586';
      else if (percentage >= 75) scoreColor = '#1C355E';
      else if (percentage >= 65) scoreColor = '#625D9C';
      else if (percentage >= 55) scoreColor = '#00C1DE';
      else if (percentage >= 40) scoreColor = '#EA6852'; 
  
    try {
      // Function to add headers on every page
      const addPageHeader = () => {
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(33, 150, 243);
        doc.text('Review Details for Product: ' + productName.toUpperCase(), 10, 20);
  
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`Company: ${companyName}`, 10, 30);
        doc.text(`Version: ${review.version}`, 10, 38);
  
        // Draw a line under the header
        doc.setDrawColor(33, 150, 243);
        doc.line(10, 42, 200, 42);

        doc.setFontSize(30); // Large font for emphasis
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(scoreColor); // Use the color based on the score range
        doc.text(`${percentage}%`, 200 - 10, 40, { align: 'right' }); // Align the percentage to t
      };
  
      // Add header on the first page
      addPageHeader();
  
      // Function to format JSON fields as lists with labels
      const formatFieldAsList = (field, type) => {
        if (Array.isArray(field)) {
          return field.map((item) => `- ${getLabel(type, item)}`).join('\n');
        }
        return `- ${getLabel(type, field)}` || 'N/A';
      };
  
      // Prepare product details for display in a table
      const productDetails = [
        ['Product Language', formatFieldAsList(product.product_language, 'product_language')],
        ['Product Description', product.description],
        ['Challenges Addressed', product.challenge_addressed],
        ['User Guide Link', product.user_guide_link],
        ['Data Source', product.data_source],
        ['Product Sector', formatFieldAsList(product.product_sector, 'product_sector')],
        ['Update Basis', formatFieldAsList(product.update_basis, 'update_basis')],
        ['Regions Served', formatFieldAsList(product.region_area, 'region_area')],
        ['Current Product Status', product.product_status],
        ['Major System Update Frequency', product.update_frequency],
        ['Development Roles', formatFieldAsList(product.development_roles, 'development_roles')],
        ['Model Training Data Size', product.model_training_data_size],
        ['Number of Developers developing the product', product.number_of_employees],
        ['Data Stored', formatFieldAsList(product.data_stored, 'data_stored')],
        ['Server Details', product.data_stored_details],
        ['License Type', formatFieldAsList(product.license_type, 'license_type')],
        ['License Type Details', product.license_type_details],
        ['Product Type', formatFieldAsList(product.product_type, 'product_type')],
        ['Product Type Other', product.product_type_other],
        ['Clients', formatFieldAsList(product.clients, 'clients')],
        ['Top Clients', formatFieldAsList(product.top_clients, 'top_clients')],
        ['Number of Clients', product.number_of_clients],
        ['Product Launch Date', product.product_launch_date],
        ['Total Score', `${totalAchieved} / ${totalPossible}`],
        ['Revision Date', revisionDate],
      ];
  
      // Display product details in a table
      doc.autoTable({
        head: [['Field', 'Details']],
        body: productDetails.map(([key, value]) => [key, value]),
        startY: 48,
        theme: 'striped',
        headStyles: {
          fillColor: [33, 150, 243],
          textColor: 255,
          fontStyle: 'bold',
        },
        margin: { top: 10, left: 10, right: 10 },
        styles: {
          fontSize: 10,
          cellPadding: 5,
          overflow: 'linebreak',
        },
      });
  
      // Iterate through each document field to display detailed scoring and comments
      documentFields.forEach((docField, index) => {
        // Start a new page for each section
        doc.addPage();
        addPageHeader();
  
        const { achieved, total } = calculateTotalMarks(docField.name);
        const { checkedCount, totalCount } = getCheckedCriteriaCount(docField.name);
  
        // Title for each section
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(docField.title, 10, 55);
  
        // Prepare data for each requirement in the document without the Status column
        const requirementsData = docField.requirements.map((criteria) => {
          return [
            criteria.requirement,
            criteria.marks,
            review.document_reviews?.[docField.name]?.[criteria.requirement]?.achieved
              ? 'Achieved'
              : 'Not Achieved',
          ];
        });
  
        // Display the requirements in a table
        doc.autoTable({
          head: [['Requirement', 'Marks', 'Result']],
          body: requirementsData,
          startY: 60,
          theme: 'grid',
          headStyles: {
            fillColor: [33, 150, 243],
            textColor: 255,
            fontStyle: 'bold',
          },
          styles: {
            fontSize: 10,
            cellPadding: 5,
          },
        });
  
        // Calculate position for comments
        const finalY = doc.autoTable.previous.finalY + 10;
  
        // Add comments from the review
        const comments = review.comments[docField.name] || 'No comments provided for this section.';
        doc.setFontSize(11);
        doc.setTextColor(50);
        doc.text('Comments:', 10, finalY);
        doc.setFontSize(10);
        doc.text(doc.splitTextToSize(comments, 180), 10, finalY + 6);
      });
  
      // Add generated date at the bottom of each page
      doc.setFontSize(10);
      doc.setTextColor(100);
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Generated on ${format(new Date(), 'MM/dd/yyyy h:mm a')}`, 10, 287);
        doc.text(`Page ${i} of ${pageCount}`, 200 - 10, 287, { align: 'right' });
      }
  
      // Save the PDF file
      doc.save(`${productName.replace(/\s+/g, '_')}_${review.version}.pdf`);
      setExporting(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF.');
      setExporting(false);
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  if (loading) {
    return (
      <div className="review-details-div text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-details-div">
        <Alert variant="danger">
          {error}
        </Alert>
      </div>
    );
  }

  const { totalAchieved, totalPossible, percentage } = calculateFinalScore();
  const revisionDate = review.revision_date ? format(new Date(review.revision_date), 'MM/dd/yyyy h:mm a') : 'N/A';
  const formatAchieved = (achieved) => {
    return achieved ? (
      <span style={{ color: 'green', fontWeight: 'bold' }}>Achieved</span>
    ) : (
      <span style={{ color: 'red', fontWeight: 'bold' }}>Not Achieved</span>
    );
  };
  return (
    <div className="review-details-div container mt-4">
      <Card className="review-details-card">
        <Card.Body>
        <Card.Title className="review-details-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <span>
    Review Details for Product: <strong>{product.name}</strong>
  </span>
  <span style={{ fontSize: '32px', fontWeight: 'bold' }}>
    {percentage}%
  </span>
</Card.Title>

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
      <td>{renderList(product.region_area, 'region_area')}</td>
    </tr>
    <tr>
      <td><strong>Current Product Status</strong></td>
      <td>{product.product_status}</td>
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

            <tr>
              <td><strong>Company</strong></td>
              <td>{product.company_name}</td>
            </tr>
            <tr>
              <td><strong>Version</strong></td>
              <td>{review.version}</td>
            </tr>
            <tr>
              <td><strong>Final Score</strong></td>
              <td>{percentage}%</td>
            </tr>
            <tr>
              <td><strong>Revision Date</strong></td>
              <td>{revisionDate}</td>
            </tr>
            <tr>
              <td><strong>Total Score</strong></td>
              <td>{totalAchieved} / {totalPossible}</td>
            </tr>
          </tbody>
        </Table>

          <h3 className="review-details-subtitle">Document Reviews</h3>
          <Table bordered hover responsive className="document-review-table">
            <thead className="table-primary">
              <tr>
                <th>Document</th>
                <th>Achieved Criteria</th>
                <th>Checked Criteria</th>
                <th>Score</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {documentFields.map((doc, index) => {
                const { checkedCount, totalCount } = getCheckedCriteriaCount(doc.name);
                const { achieved, total } = calculateTotalMarks(doc.name);
                return (
                  <tr key={index}>
                    <td>{doc.title}</td>
                    <td>
                      <ul>
                        {doc.requirements.map((criteria, i) => {
                          const normalizeName = (name) => name.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
                          const isAchieved = review.document_reviews?.[normalizeName(doc.name)]?.[criteria.requirement]?.achieved === true;
                          return (
                            <li key={i} style={{ color: isAchieved ? 'green' : 'red' }}>
                              {criteria.requirement} ({criteria.marks} Marks)
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td>{`${checkedCount}/${totalCount}`}</td>
                    <td>{`${achieved}/${total}`}</td>
                    <td>{review.comments[doc.name] || 'No comments'}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Button variant="info" onClick={handleExportPDF} className="mt-3" disabled={exporting}>
            {exporting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> Exporting...
              </>
            ) : 'Export as PDF'}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReviewDetails;
