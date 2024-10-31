import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import '../static/CompanyList.css'; // Import the CSS file

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/companies/')
      .then(response => {
        console.log('API response:', response.data); // Log the entire response
        setCompanies(response.data.companies || response.data); // Adjust based on the structure
      })
      .catch(error => {
        console.error('There was an error fetching the companies:', error);
      });
  }, []);
  

  return (
    <div className="company-list-container">
      <h2 className="company-list-title">Companies</h2>
      {Array.isArray(companies) && companies.map(company => (
        <div key={company.id}>
          <h3>{company.name}</h3>
          <p>{company.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyList;
