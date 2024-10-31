import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Accordion, Table } from 'react-bootstrap';
import '../static/AddProduct.css'; // Import custom CSS
import Select from 'react-select';
import { set } from 'date-fns';

function AddProduct() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [challengeAddressed, setChallengeAddressed] = useState('');
  const [productTypeOther, setproductTypeOther] = useState('');
  const [licenseTypeDetails, setlicenseTypeDetails] = useState('');
  const [dataStoredDetails, setdataStoredDetails] = useState('');
  const [userGuideLink, setUserGuideLink] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [productLanguage, setProductLanguage] =useState([]);
  const [productSector, setProductSector] = useState([]);
  const [productType, setProductType] =useState([]);
  const [numberOfEmployees, setnumberOfEmployees] = useState('');
  const [updateFrequency, setUpdateFrequency] = useState('');
  const [regionArea, setRegion] = useState([]);
  const [productStatus, setproductStatus] = useState('');
  const [updateBasis, setUpdateBasis] = useState([]); // Initialize as an array
  const [developmentRoles, setDevelopmentRoles]= useState([]);
  const [dataSource, setDataSource] = useState('');
  const [modelTrainingDataSize, setModelTrainingDataSize] = useState('');
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [documentReviews, setDocumentReviews] = useState({});
  const [documentFields, setDocumentFields] = useState([]);
  const [dataStored, setDataStored] = useState([]);
  const [licenseType, setLicenseType] = useState([]);
  const [clients, setClients] = useState([]);
  const [numberOfClients, setNumberOfClients] = useState('');
  const [topClients, setTopClients] = useState(['']); // Start with one input
  const [productLaunchDate, setProductLaunchDate] = useState('');
  const multiSelectOptions = [
    { value: 'local_cloud', label: 'On a local cloud?' },
    { value: 'international_cloud', label: 'On an international cloud?' },
    { value: 'hybrid_cloud', label: 'On a hybrid cloud?' },
    { value: 'data_center', label: 'In a third-party data center' },
    { value: 'in_house_servers', label: 'In-house servers' },
    { value: 'on_premises', label: 'On-premises storage' },
    { value: 'private_cloud', label: 'On a private cloud?' },
  ];

  const licenseTypeOptions = [
    { value: 'saas', label: 'Software as a Service (SaaS)' },
    { value: 'on_premises', label: 'On Premises' },
    { value: 'user_based', label: 'User Based' },
    { value: 'transaction_based', label: 'Transaction Based' },
    { value: 'open_source', label: 'Open Source' },
  ];
  const regionAreaOptions = [
    { value: 'north_america', label: 'North America' },
    { value: 'south_america', label: 'South America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'africa', label: 'Africa' },
    { value: 'middle_east', label: 'Middle East' },
    { value: 'oceania', label: 'Oceania' },
    { value: 'global', label: 'Global' }, // For products that serve globally
    { value: 'eastern_europe', label: 'Eastern Europe' },
    { value: 'western_europe', label: 'Western Europe' },
    { value: 'central_america', label: 'Central America' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'northern_africa', label: 'Northern Africa' },
    { value: 'southern_africa', label: 'Southern Africa' },
    { value: 'southeast_asia', label: 'Southeast Asia' },
    { value: 'east_asia', label: 'East Asia' },
    { value: 'south_asia', label: 'South Asia' },
    { value: 'central_asia', label: 'Central Asia' },
    { value: 'north_east_asia', label: 'Northeast Asia' },
    { value: 'gulf_region', label: 'Gulf Region' },
  ];

  const productStatusOptions = [
    { value: 'in_development', label: 'In Development' },
    { value: 'beta_testing', label: 'Beta Testing' },
    { value: 'available_for_sale', label: 'Available for Sale' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'discontinued', label: 'Discontinued' },
    { value: 'pilot_program', label: 'Pilot Program' },
    { value: 'maintenance_mode', label: 'Maintenance Mode' },
    { value: 'closed_beta', label: 'Closed Beta' },
    { value: 'public_beta', label: 'Public Beta' },
    { value: 'prototype', label: 'Prototype' },
    { value: 'mvp', label: 'Minimum Viable Product (MVP)' },
    { value: 'pre_launch', label: 'Pre-Launch' },
    { value: 'research_stage', label: 'Research Stage' },
  ];
  

  const clientOptions = [
    { value: 'government', label: 'Government' },
    { value: 'private', label: 'Private' },
    { value: 'individuals', label: 'Individuals' },
    { value: 'internal_use', label: 'Internal Use' },
  ];
  const dataStoredOptions = [
    { value: 'local_cloud', label: 'On a local cloud?' },
    { value: 'international_cloud', label: 'On an international cloud?' },
    { value: 'hybrid_cloud', label: 'On a hybrid cloud?' },
    { value: 'data_center', label: 'In a third-party data center' },
    { value: 'in_house_servers', label: 'In-house servers' },
    { value: 'on_premises', label: 'On-premises storage' },
    { value: 'private_cloud', label: 'On a private cloud?' },
  ];


  const developmentRolesOptions = [
    { value: 'developers_only', label: 'Developers only' },
    { value: 'project_managers', label: 'Project Managers' },
    { value: 'product_owners', label: 'Product Owners' },
    { value: 'data_scientists', label: 'Data Scientists' },
    { value: 'data_analysts', label: 'Data Analysts' },
    { value: 'ui_ux_designers', label: 'UI/UX Designers' },
    { value: 'devops_engineers', label: 'DevOps Engineers' },
    { value: 'quality_assurance_engineers', label: 'Quality Assurance Engineers' },
    { value: 'business_analysts', label: 'Business Analysts' },
    { value: 'system_architects', label: 'System Architects' },
    { value: 'technical_writers', label: 'Technical Writers' },
    { value: 'machine_learning_engineers', label: 'Machine Learning Engineers' },
    { value: 'cybersecurity_specialists', label: 'Cybersecurity Specialists' },
    { value: 'database_administrators', label: 'Database Administrators' },
    { value: 'network_engineers', label: 'Network Engineers' },
    { value: 'frontend_developers', label: 'Frontend Developers' },
    { value: 'backend_developers', label: 'Backend Developers' },
    { value: 'full_stack_developers', label: 'Full Stack Developers' },
    { value: 'mobile_app_developers', label: 'Mobile App Developers' },
    { value: 'game_developers', label: 'Game Developers' },
    { value: 'cloud_engineers', label: 'Cloud Engineers' },
  ];

  const updateBasisOptions = [
    { value: 'bugs', label: 'Bugs' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'model_retraining', label: 'Model Retraining' },
    { value: 'performance_improvements', label: 'Performance Improvements' },
    { value: 'security_patches', label: 'Security Patches' },
    { value: 'new_features', label: 'New Features' },
  ];
  const productLanguageOptions = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'Swedish', label: 'Swedish' },
    { value: 'Danish', label: 'Danish' },
    { value: 'Norwegian', label: 'Norwegian' },
    { value: 'Finnish', label: 'Finnish' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Vietnamese', label: 'Vietnamese' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Malay', label: 'Malay' },
];
const productSectorOptions = [
  { value: 'Finance', label: 'Finance' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Supply Chain', label: 'Supply Chain' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Telecommunications', label: 'Telecommunications' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Education', label: 'Education' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Travel and Hospitality', label: 'Travel and Hospitality' },
];
const productTypeOptions = [
  { value: 'Recommender', label: 'Recommender' },
  { value: 'Decision Assistant', label: 'Decision Assistant' },
  { value: 'Chatbot', label: 'Chatbot' },
  { value: 'Image Recognition', label: 'Image Recognition' },
  { value: 'Natural Language Processing', label: 'Natural Language Processing' },
  { value: 'Speech Recognition', label: 'Speech Recognition' },
  { value: 'Sentiment Analysis', label: 'Sentiment Analysis' },
  { value: 'Predictive Analytics', label: 'Predictive Analytics' },
  { value: 'Fraud Detection', label: 'Fraud Detection' },
  { value: 'Automated Transcription', label: 'Automated Transcription' },
  { value: 'Voice Assistant', label: 'Voice Assistant' },
  { value: 'Computer Vision', label: 'Computer Vision' },
  { value: 'Text Generation', label: 'Text Generation' },
  { value: 'Language Translation', label: 'Language Translation' },
  { value: 'Augmented Reality', label: 'Augmented Reality' },
  { value: 'Robotic Process Automation', label: 'Robotic Process Automation' },
  { value: 'Time Series Analysis', label: 'Time Series Analysis' },
];

const addTopClientField = () => {
  if (topClients.length < 6) {
    setTopClients([...topClients, '']);
  } else {
    alert('You can only add up to 6 top clients.');
  }
};
const removeTopClientField = (index) => {
  const newTopClients = [...topClients];
  newTopClients.splice(index, 1);
  setTopClients(newTopClients);
};

  const handleLicenseTypeChange = (value) => {
    setLicenseType(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleClientsChange = (value) => {
    setClients(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };
  const handleUpdateBasisChange = (value) => {
    setUpdateBasis(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };
  
  // Update for Development Roles
  const handleDevelopmentRolesChange = (value) => {
    setDevelopmentRoles(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/companies/')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch the documentFields.json file
    axios.get('/documentFields.json')
      .then(response => {
        setDocumentFields(response.data);
  
        // Initialize documentReviews with page numbers set to 0 for each requirement
        const initialReviews = {};
        response.data.forEach(doc => {
          initialReviews[doc.name] = {};
          doc.requirements.forEach(req => {
            initialReviews[doc.name][req.requirement] = { pageNumber: 0 };
          });
        });
        setDocumentReviews(initialReviews);
      })
      .catch(error => {
        console.error('Error fetching the document fields:', error);
      });
  }, []);
    const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (dataStored.length === 0) {
      alert("Please select at least one option for 'Where is the Data Stored?'.");
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('challenge_addressed', challengeAddressed);
    formData.append('product_type_other', productTypeOther);
    formData.append('license_type_details', licenseTypeDetails);
    formData.append('data_stored_details', dataStoredDetails);
    formData.append('user_guide_link', userGuideLink);
    formData.append('company', company);
    formData.append('product_status',productStatus );
    formData.append('update_frequency', updateFrequency);
    formData.append('number_of_employees', numberOfEmployees);
    formData.append('data_source', dataSource);
    formData.append('model_training_data_size', modelTrainingDataSize);
    formData.append('number_of_clients', numberOfClients);
    formData.append('product_launch_date', productLaunchDate);
    formData.append('document_reviews', JSON.stringify(documentReviews));

    // Append array fields as JSON strings where required
    formData.append('product_language', JSON.stringify(productLanguage.map((option) => option.value)));
    formData.append('region', JSON.stringify(regionArea.map((option) => option.value)));
    formData.append('update_basis', JSON.stringify(updateBasis.map((option) => option.value)));
    formData.append('clients', JSON.stringify(clients.map((option) => option.value)));
    formData.append('top_clients', JSON.stringify(topClients.filter((client) => client)));
    formData.append('data_stored', JSON.stringify(dataStored.map(option => option.value)));

    // For fields expecting IDs (PKs)
    formData.append('product_sector', JSON.stringify(productSector.map(option => option.value)));
    formData.append('product_type', JSON.stringify(productType.map(option => option.value)));
    formData.append('development_roles', JSON.stringify(developmentRoles.map(option => option.value)));
    formData.append('license_type', JSON.stringify(licenseType.map(option => option.value)));
  
  
  

    const uploadFields = [
      'risk_management', 'transparency_report', 'fairness_equity',
      'accountability_and_responsibility', 'system_performance_indicators', 'privacy_and_security',
      'stakeholder_engagement', 'compliance_in_principles', 'impact_of_ai_system_on_human_rights',
      'social_environmental_and_cultural_impact_assessment', 'training_intiatives_for_employees'
    ];


    uploadFields.forEach(field => {
      if (files[field]) {
        formData.append(field, files[field]);
      }
    });

    axios.post('http://127.0.0.1:8000/api/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        alert('Product added successfully!');
        setLoading(false);
        resetForm();
      })
      .catch((error) => {
        console.error('Error adding product:', error.response ? error.response.data : error);
        alert(`Error: ${error.response ? JSON.stringify(error.response.data) : 'An error occurred.'}`);
        setLoading(false);
      });
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setChallengeAddressed('');
    setproductTypeOther('');
    setlicenseTypeDetails('');
    setdataStoredDetails('');
    setUserGuideLink('');
    setCompany('');
    setProductLanguage([]);
    setProductSector([]);
    setUpdateFrequency('');
    setproductStatus('');
    setRegion([]);
    setProductType([]);
    setnumberOfEmployees('');
    setUpdateBasis('');
    setDevelopmentRoles({});
    setDataSource('');
    setModelTrainingDataSize('');
    setFiles({});
    setDocumentReviews({});
    setDataStored([]);
    setLicenseType([]);
    setClients([]);
    setNumberOfClients('');
    setTopClients(['', '', '', '', '', '']);
    setProductLaunchDate('');
  };
  const productSectors = [
    "Finance", 
    "Agriculture", 
    "Supply Chain", 
    "Customer Support", 
    "Fraud Detection", 
    "Healthcare", 
    "Education", 
    "Cybersecurity", 
    "Retail", 
    "Manufacturing", 
    "Smart Cities", 
    "Robotics", 
    "Autonomous Vehicles", 
    "Energy", 
    "Telecommunications", 
    "Transportation", 
    "Entertainment", 
    "Real Estate", 
    "Hospitality", 
    "Insurance", 
    "Media", 
    "Pharmaceuticals", 
    "Construction", 
    "Logistics", 
    "Non-Profit", 
    "Government", 
    "Legal", 
    "Aerospace", 
    "Food and Beverage", 
    "Travel", 
    "Environmental Services",
    "Mining", 
    "Textiles", 
    "Apparel", 
    "Consumer Electronics", 
    "Beauty and Personal Care", 
    "Fitness", 
    "Sports", 
    "Television and Film", 
    "E-commerce", 
    "Data Analytics", 
    "Artificial Intelligence", 
    "Construction Tech", 
    "Health Tech", 
    "FinTech", 
    "MarTech", 
    "AgTech", 
    "AdTech", 
    "Supply Chain Tech"
];


  return (
    <div className="container">
      <Card className="mt-4 review-product-card">
      <Card.Body>
          <h2>Add Product</h2>
          <Form onSubmit={handleSubmit}>
            {/* Product Information */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>What challenges does the product solve</Form.Label>
              <Form.Control
                as="textarea"
                value={challengeAddressed}
                onChange={(e) => setChallengeAddressed(e.target.value)}
                placeholder="What challenges does the product solve"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User Guide Link</Form.Label>
              <Form.Control
                type="url"
                value={userGuideLink}
                onChange={(e) => setUserGuideLink(e.target.value)}
                placeholder="Enter user guide link"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                as="select"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              >
                <option disabled value="">Select Company</option>
                {companies.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
              <Form.Group className="mb-3">
              <Form.Label>Product Language</Form.Label>
              <Select
                isMulti
                options={productLanguageOptions}
                value={productLanguage}
                onChange={setProductLanguage}
                placeholder="Select languages"
              />
            </Form.Group>
              </div>

              <div className="col-md-6">
              <Form.Group className="mb-3">
              <Form.Label>Product Sector</Form.Label>
              <Select
                isMulti
                options={productSectorOptions}
                value={productSector}
                onChange={setProductSector}
                placeholder="Select sectors"
              />
            </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Major System Update Frequency</Form.Label>
                  <Form.Control
                    as="select"
                    value={updateFrequency}
                    onChange={(e) => setUpdateFrequency(e.target.value)}
                    required
                  >
                    <option disabled value="">Select Frequency</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Semi-Annual">Semi-Annual</option>
                    <option value="Yearly">Yearly</option>

                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Data Source</Form.Label>
                  <Form.Control
                    type="text"
                    value={dataSource}
                    onChange={(e) => setDataSource(e.target.value)}
                    placeholder="Enter data source"
                    required
                  />
                </Form.Group>
              </div>

 <Form.Group className="mb-3">
              <Form.Label>Development Roles</Form.Label>
              <Select
                isMulti
                options={developmentRolesOptions}
                value={developmentRoles}
                onChange={setDevelopmentRoles}
                placeholder="Select development roles"
              />
            </Form.Group>

            {/* Update Basis Multi-Select */}
            <Form.Group className="mb-3">
              <Form.Label>Update Basis</Form.Label>
              <Select
                isMulti
                options={updateBasisOptions}
                value={updateBasis}
                onChange={setUpdateBasis}
                placeholder="Select update basis"
              />
            </Form.Group>

              
            </div>
            <div className="row">
              <div className="col-md-6">
              <Form.Group className="mb-3">
              <Form.Label>Product Type</Form.Label>
              <Select
                isMulti
                options={productTypeOptions}
                value={productType}
                onChange={setProductType}
                placeholder="Select product types"
              />
            </Form.Group>
            </div>

            <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Other Product Type</Form.Label>
              <Form.Control
                type="text"
                value={productTypeOther}
                onChange={(e) => setproductTypeOther(e.target.value)}
                placeholder="Other Product Type"
                
              />
            </Form.Group>

              </div>
              
              <Form.Group className="mb-3">
  <Form.Label><strong>Number of Developers developing the product</strong></Form.Label>
  <Form.Control
  type="number"
  value={numberOfEmployees}  // Bind the value to state
  onChange={(e) => setnumberOfEmployees(e.target.value)}  // Update the state
  name="number_of_employees"
  placeholder="Enter number of Developers"
  required
/>

</Form.Group>

             
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Model Training Data Size</Form.Label>
              <Form.Control
                type="text"
                value={modelTrainingDataSize}
                onChange={(e) => setModelTrainingDataSize(e.target.value)}
                placeholder="Enter model training data size"
                required
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
              <Form.Group className="mb-3">
              <Form.Label>Where is the Data used on developing the product Stored?</Form.Label>
              <Select
                isMulti
                options={dataStoredOptions}
                value={dataStored}
                onChange={setDataStored}
                placeholder="Select"
              />
            </Form.Group>
            </div>
            <div className="col-md-6">

            <Form.Group className="mb-3">
              <Form.Label>Server Details</Form.Label>
              <Form.Control
                type="text"
                value={dataStoredDetails}
                onChange={(e) => setdataStoredDetails(e.target.value)}
                placeholder="Server Details"
                required
              />
            </Form.Group>
            </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Regions Served</Form.Label>
              <Select
                isMulti
                options={regionAreaOptions}
                value={regionArea}
                onChange={setRegion}
                placeholder="Select region areas where product is operating"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Current Product Status</Form.Label>
              <Select
                options={productStatusOptions}
                value={productStatusOptions.find(option => option.value === productStatus)}
                onChange={(selectedOption) => setproductStatus(selectedOption.value)}
                placeholder="Select current product status"
              />
            </Form.Group>


            <div className="row">
              <div className="col-md-6">
              <Form.Group className="mb-3">
              <Form.Label>License Type</Form.Label>
              <Select
                isMulti
                options={licenseTypeOptions}
                value={licenseType}
                onChange={setLicenseType}
                placeholder="Select license types"
              />
            </Form.Group>
            </div>
            <div className="col-md-6">

            <Form.Group className="mb-3">
            <Form.Label>License Type Details</Form.Label>
              <Form.Control
                type="text"
                value={licenseTypeDetails}
                onChange={(e) => setlicenseTypeDetails(e.target.value)}
                placeholder="License Type Details"
                required
              />
            </Form.Group>
            </div>
            </div>


  {/* Clients Multi-Select */}
  <Form.Group className="mb-3">
              <Form.Label>Clients</Form.Label>
              <Select
                isMulti
                options={clientOptions}
                value={clients}
                onChange={setClients}
                placeholder="Select clients"
              />
            </Form.Group>


{/* Number of Clients */}
<Form.Group className="mb-3">
  <Form.Label><strong>Number of Clients</strong></Form.Label>
  <Form.Control
    type="number"
    name="number_of_clients"
    value={numberOfClients} // Bind the value from state
    onChange={(e) => setNumberOfClients(e.target.value)} // Update the state
    placeholder="Enter number of clients"
    required
  />
</Form.Group>


<Form.Group className="mb-3">
  <Form.Label><strong>Top Clients of the Product</strong></Form.Label>
  {topClients.map((client, index) => (
    <div key={index} className="mb-2 d-flex align-items-center">
      <Form.Control
        type="text"
        name={`top_clients_${index}`}
        value={client}
        onChange={(e) => {
          const newTopClients = [...topClients];
          newTopClients[index] = e.target.value;
          setTopClients(newTopClients);
        }}
        placeholder="Enter top client"
        className="flex-grow-1"
      />
      <Button
        variant="danger"
        onClick={() => removeTopClientField(index)}
        className="ml-2 btn-sm d-flex justify-content-center align-items-center"
        style={{ width: '30px', height: '30px', padding: '0' }} // Make the button square and compact
        disabled={topClients.length === 1} // Disable removal if only one input remains
        aria-label="Remove client"
      >
        &times; {/* Use &times; for an 'X' symbol */}
      </Button>
    </div>
  ))}
  {topClients.length < 6 && (
    <Button variant="success" onClick={addTopClientField} className="mt-2 btn-sm">
      Add Another Client
    </Button>
  )}
</Form.Group>



<Form.Group className="mb-3">
  <Form.Label><strong>Product Launch Date (YYYY-MM-DD)</strong></Form.Label>
  <Form.Control 
    type="date" 
    value={productLaunchDate} 
    onChange={(e) => setProductLaunchDate(e.target.value)} 
    required 
  />
</Form.Group>



<h2>Please submit all required documents and include the corresponding page number.</h2>                       
<p>Be aware that the company is fully responsible for the accuracy and completeness of all documents provided.</p>




{documentFields.length > 0 && (
  <Accordion>
    {documentFields.map((doc, index) => (
      <Accordion.Item eventKey={index} key={index}>
        <Accordion.Header>{doc.title}</Accordion.Header>
        <Accordion.Body>
          <p>{doc.description}</p>
          <Table  bordered hover>
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Expected Outcome</th>
                <th>Marks</th>
                <th>Page Number</th> {/* New column for page number */}
              </tr>
            </thead>
            <tbody>
              {doc.requirements.map((req, reqIndex) => (
                <tr key={reqIndex}>
                  <td>{req.requirement}</td>
                  <td>{req.expected}</td>
                  <td>{req.marks}</td>
                  <td>
                  <Form.Control
  type="number"
  name={`page_${doc.name}_${req.requirement}`} // Unique field name for the page input
  value={documentReviews[doc.name]?.[req.requirement]?.pageNumber || ''} // Ensure the current value is shown
  onChange={(e) => {
    const newValue = e.target.value;

    // Ensure a deep update of the nested state for page numbers
    setDocumentReviews((prevReviews) => {
      // Create a shallow copy of the existing reviews
      const updatedReviews = { ...prevReviews };

      // Create a shallow copy of the specific document's reviews or initialize if undefined
      const docReviews = updatedReviews[doc.name] || {};

      // Create a shallow copy of the specific requirement's review or initialize if undefined
      const requirementReview = docReviews[req.requirement] || {};

      // Update the page number
      requirementReview.pageNumber = newValue;

      // Assign the updated requirement review back to the document's reviews
      docReviews[req.requirement] = requirementReview;

      // Assign the updated document reviews back to the overall reviews object
      updatedReviews[doc.name] = docReviews;

      return updatedReviews;
    });
  }}
  placeholder="Page No."
/>


                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Form.Group className="mt-3">
            <Form.Label>Upload {doc.title} Document</Form.Label>
            <Form.Control
              type="file"
              name={doc.name}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            
            />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
)}



            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddProduct;
