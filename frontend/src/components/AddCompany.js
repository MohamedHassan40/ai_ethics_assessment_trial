import React, { useState } from 'react';
import axios from 'axios';

function AddCompany() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [company_url, setCompanyURL] = useState('');
  const [company_size, setCompanySize] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !description || !company_url || !company_size) {
      alert("All fields are required. Please complete the form.");
      return;
    }
  
    const data = { name, description, company_size, company_url };
    
    axios.post('http://127.0.0.1:8000/api/companies/', data)
      .then((response) => {
        if (response.status === 201) {
          alert('Company added successfully!');
          setName('');  // Reset the form fields
          setDescription('');
          setCompanyURL('');
          setCompanySize('');
        } else {
          alert('Unexpected response from the server.');
          console.error('Unexpected response:', response);
        }
      })
      .catch((error) => {
        console.error('There was an error adding the company:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
          alert('An error occurred: ' + error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('No response received from server.');
        } else {
          alert('Error creating request.');
        }
      });
  };
  

  return (
    <div className="form-container emp-profile">
      <h2>Add Company</h2>
      <form className="add-company-form" onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter company name" 
          required 
        />
        
        <label>Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter company description" 
          required 
        />

        <label>Company URL</label>
        <input 
          type="text" 
          value={company_url} 
          onChange={(e) => setCompanyURL(e.target.value)} 
          placeholder="Enter company URL" 
          required 
        />
        <label>Company Size</label>
        <input 
          type="text" 
          value={company_size} 
          onChange={(e) => setCompanySize(e.target.value)} 
          placeholder="Company size(E.g 100-200)" 
          required 
        />
        

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
}

export default AddCompany;
