import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../static/ReviewList.css';  // Import the CSS file

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/reviews/')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the reviews!', error);
      });
  }, []);

  return (
    <Container className="review-list-container">
      <h2 className="review-list-title">Product Reviews</h2>
      <Table striped bordered hover responsive className="review-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Version</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.productName}</td>
              <td>{review.version}</td>
              <td>
                <Link to={`/reviews/${review.id}`} className="review-link">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ReviewList;
