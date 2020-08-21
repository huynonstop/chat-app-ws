import React from 'react';
import { Link } from '@reach/router';
import Container from '../components/Container';

const NotFound = () => (
  <Container flex className="page">
    <div className="w-100 text-center">
      <h3 className="text-center">404 page not found</h3>
      <p className="text-center">We are sorry but the page you are looking for does not exist.</p>
      <Link to="/">Back to home</Link>
    </div>
  </Container>
);

export default NotFound;
