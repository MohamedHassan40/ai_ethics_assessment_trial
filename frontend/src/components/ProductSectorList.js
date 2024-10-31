import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import '../static/SharedStyles.css'; // Adjust the path as needed

function ProductSectorList() {
  const [sectors, setSectors] = useState([]);
  const [newSector, setNewSector] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/product-sectors/')
      .then((response) => setSectors(response.data))
      .catch((error) => console.error('Error fetching sectors:', error));
  }, []);

  const handleAddSector = () => {
    axios.post('http://127.0.0.1:8000/api/product-sectors/', { name: newSector })
      .then((response) => {
        setSectors([...sectors, response.data]);
        setNewSector('');
      })
      .catch((error) => console.error('Error adding sector:', error));
  };

  const handleDeleteSector = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/product-sectors/${id}/`)
      .then(() => setSectors(sectors.filter((sector) => sector.id !== id)))
      .catch((error) => console.error('Error deleting sector:', error));
  };

  return (
    <div className="list-container">
    <h2 className="list-title">Manage Product Sectors</h2>
    <Form>
        <Form.Group>
            <Form.Label>Add a New Sector</Form.Label>
            <Form.Control
                type="text"
                value={newSector}
                onChange={(e) => setNewSector(e.target.value)}
                placeholder="Enter sector name"
            />
        </Form.Group>
        <Button className="add-button" onClick={handleAddSector}>Add Sector</Button>
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
            {sectors.map(sector => (
                <tr key={sector.id}>
                    <td>{sector.id}</td>
                    <td>{sector.name}</td>
                    <td>
                        <Button variant="danger" onClick={() => handleDeleteSector(sector.id)}>Delete</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
</div>
  );
}

export default ProductSectorList;
