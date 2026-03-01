import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function ProductPage() {
  const { id } = useParams(); // Extracts the "id" from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only the specific product using the ID
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (loading) return <Container className="mt-5"><p>Loading product details...</p></Container>;
  if (!product) return <Container className="mt-5"><p>Product not found.</p></Container>;

  return (
    <Container className="mt-5">
      <div className="d-flex gap-2">
        <Link to="/products" className="btn btn-outline-secondary mb-4">← Back to Products</Link>
        <Link to={`/product/edit/${id}`} className="btn btn-outline-secondary mb-4">Edit Product</Link>
        <Link to={`/product/delete/${id}`} className="btn btn-outline-secondary mb-4">Delete Product</Link>
      </div>
      <Row>
        <Col md={6} className="text-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="img-fluid" 
            style={{ maxHeight: '500px', objectFit: 'contain' }} 
          />
        </Col>
        <Col md={6}>
          <h1 className="display-5">{product.title}</h1>
          <p className="text-muted text-uppercase fw-bold">{product.category}</p>
          <hr />
          <h3 className="text-primary my-3">${product.price}</h3>
          <p className="lead">{product.description}</p>
          <div className="d-grid gap-2 mt-4">
            <Button variant="primary" size="lg">Add to Cart</Button>
            <Button variant="outline-dark" size="lg">Buy Now</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;