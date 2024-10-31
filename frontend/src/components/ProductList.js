import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../static/ProductList.css';  // Import the CSS file

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch the list of products from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        console.log('API response:', response.data);
        const productsData = Array.isArray(response.data) ? response.data : response.data.products;
        setProducts(productsData || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the products:', error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Products</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {Array.isArray(products) && products.map(product => (
          <Col key={product.id}>  
            <Card className="product-card">
              <Card.Body>
                <Card.Title className="product-card-title">{product.name}</Card.Title>
                <Card.Text className="product-card-text">{product.description}</Card.Text>
                {/* Start Review Button */}
                <Link to={`/review/${product.id}`}>
                  <Button variant="primary" className="review-button">Start Review</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
  
  
}

export default ProductList;
