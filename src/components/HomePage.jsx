import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <Container>
    <Row>
        <Col>
            <h3>Hi, welcome to Fake Store App</h3>
            <p>This app will let you browse fake products.</p>
        </Col>
    </Row>

    <Row>
        <Col>
            <div className="container mt-5">
            {/* 
                Bootstrap Carousel: 
                'interval' sets the speed, 'pause' stops it on hover.
            */}
            <Carousel variant="dark" interval={3000} pause="hover">
                {products.map((product) => (
                <Carousel.Item key={product.id}>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                        <img
                            className="d-block"
                            src={product.image}
                            alt={product.title}
                            style={{ maxHeight: '100%', maxWidth: 'auto', objectFit: 'contain' }}
                        />
                        </div>
                        <Carousel.Caption className="bg-light opacity-75 rounded p-2 text-dark" style={{ position: 'relative', marginTop: '10px' }}>
                        <h5>{product.title}</h5>
                        <p>${product.price}</p>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
                ))}
            </Carousel>
            </div>
        </Col>
    </Row>

    <Row>
        <Col className="d-flex justify-content-center mt-4">
            <Button 
                as={Link} 
                to="/products" 
                variant="primary"
                size="lg"
            >
                View All Proucts
            </Button>
        </Col>
    </Row>
    </Container>
  );
}

export default HomePage;