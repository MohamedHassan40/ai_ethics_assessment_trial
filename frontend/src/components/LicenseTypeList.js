// src/components/LicenseTypeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import '../static/SharedStyles.css'; // Adjust the path as needed

function LicenseTypeList() {
  const [licenseTypes, setLicenseTypes] = useState([]);
  const [newLicenseType, setNewLicenseType] = useState('');

  useEffect(() => {
    // Fetch existing license types from the API
    axios.get('http://127.0.0.1:8000/api/license-type/')
    .then((response) => setLicenseTypes(response.data))
      .catch((error) => console.error('Error fetching license types:', error));
  }, []);

  const handleAddLicenseType = () => {
    // Post the new license type to the API
    axios.post('http://127.0.0.1:8000/api/license-type/', { name: newLicenseType })
      .then((response) => {
        setLicenseTypes([...licenseTypes, response.data]);
        setNewLicenseType(''); // Clear the input field after adding
      })
      .catch((error) => console.error('Error adding license type:', error));
  };

  const handleDeleteLicenseType = (id) => {
    // Delete the license type from the API
    axios.delete(`http://127.0.0.1:8000/api/license-type/${id}/`)
      .then(() => setLicenseTypes(licenseTypes.filter((type) => type.id !== id)))
      .catch((error) => console.error('Error deleting license type:', error));
  };

  return (
    <div className="list-container">
            <h2 className="list-title">Manage License Types</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Add a New License Type</Form.Label>
                    <Form.Control
                        type="text"
                        value={newLicenseType}
                        onChange={(e) => setNewLicenseType(e.target.value)}
                        placeholder="Enter license type name"
                    />
                </Form.Group>
                <Button className="add-button" onClick={handleAddLicenseType}>Add License Type</Button>
            </Form>

            <Table className="list-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {licenseTypes.map(type => (
                        <tr key={type.id}>
                            <td>{type.id}</td>
                            <td>{type.name}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteLicenseType(type.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
  );
}

export default LicenseTypeList;
