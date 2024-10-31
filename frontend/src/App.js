// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductList from './components/ProductList';
import ReviewProduct from './components/ReviewProduct';
import AddCompany from './components/AddCompany';
import AddProduct from './components/AddProduct';
import CompanyList from './components/CompanyList';
import ReviewList from './components/ReviewList';
import NavigationBar from './components/NavigationBar';
import ReviewDetails from './components/ReviewDetails';

import LandingPage from './components/LandingPage'
import SurveyForm from './components/SurveyForm'

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container className="mt-4">
        <Routes>
        <Route path="/" element={<LandingPage />} /> 
          <Route path="/products" element={<ProductList />} />
          <Route path="/review/:id" element={<ReviewProduct />} />
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/:id" element={<ReviewDetails />} />
          <Route path="/survey" element={<SurveyForm />} />


        </Routes>
      </Container>
    </Router>
  );
}

export default App;
