import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import '../static/SharedStyles.css'; // Adjust the path as needed

function ProductTypeList() {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/product-types/')
      .then((response) => setTypes(response.data))
      .catch((error) => console.error('Error fetching types:', error));
  }, []);

  const handleAddType = () => {
    axios.post('http://127.0.0.1:8000/api/product-types/', { name: newType })
      .then((response) => {
        setTypes([...types, response.data]);
        setNewType('');
      })
      .catch((error) => console.error('Error adding type:', error));
  };

  const handleDeleteType = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/product-types/${id}/`)
      .then(() => setTypes(types.filter((type) => type.id !== id)))
      .catch((error) => console.error('Error deleting type:', error));
  };

  return (
    <div className="list-container">
    <h2 className="list-title">Manage Product Types</h2>
    <Form>
        <Form.Group>
            <Form.Label>Add a New Type</Form.Label>
            <Form.Control
                type="text"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="Enter type name"
            />
        </Form.Group>
        <Button className="add-button" onClick={handleAddType}>Add Type</Button>
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
            {types.map(type => (
                <tr key={type.id}>
                    <td>{type.id}</td>
                    <td>{type.name}</td>
                    <td>
                        <Button variant="danger" onClick={() => handleDeleteType(type.id)}>Delete</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
</div>
  );
}

export default ProductTypeList;
