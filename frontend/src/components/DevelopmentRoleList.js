import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import '../static/SharedStyles.css'; // Adjust the path as needed


function DevelopmentRoleList() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/development-roles/')
      .then((response) => setRoles(response.data))
      .catch((error) => console.error('Error fetching roles:', error));
  }, []);

  const handleAddRole = () => {
    axios.post('http://127.0.0.1:8000/api/development-roles/', { name: newRole })
      .then((response) => {
        setRoles([...roles, response.data]);
        setNewRole('');
      })
      .catch((error) => console.error('Error adding role:', error));
  };

  const handleDeleteRole = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/development-roles/${id}/`)
      .then(() => setRoles(roles.filter((role) => role.id !== id)))
      .catch((error) => console.error('Error deleting role:', error));
  };

  return (
    <div className="list-container">
            <h2 className="list-title">Manage Development Roles</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Add a New Role</Form.Label>
                    <Form.Control
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="Enter role name"
                    />
                </Form.Group>
                <Button className="add-button" onClick={handleAddRole}>Add Role</Button>
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
                    {roles.map(role => (
                        <tr key={role.id}>
                            <td>{role.id}</td>
                            <td>{role.name}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteRole(role.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
  );
}

export default DevelopmentRoleList;
