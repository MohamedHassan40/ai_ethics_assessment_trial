import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../static/NavigationBar.css'; // Assuming the above CSS is in NavigationBar.css

function NavigationBar() {
  return (
    <Navbar className="navbar-custom" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          Product Review System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products" className="nav-link">Products</Nav.Link>
            <Nav.Link as={Link} to="/add-product" className="nav-link">Add Product</Nav.Link>
            <Nav.Link as={Link} to="/companies" className="nav-link">Companies</Nav.Link>
            <Nav.Link as={Link} to="/add-company" className="nav-link">Add Company</Nav.Link>
            <Nav.Link as={Link} to="/reviews" className="nav-link">Reviews</Nav.Link>
            <Nav.Link as={Link} to="/survey">Feedback</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
