import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';

function DeleteProduct() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const { id } = useParams();
  const navigate = useNavigate()
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

  useEffect(() => {
    let timer;
    if (showSuccess && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      navigate('/'); // Redirect to home when hits 0
    }

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [showSuccess, countdown, navigate]);

  if (loading) return <Container className="mt-5"><p>Loading product details...</p></Container>;
  if (!product) return <Container className="mt-5"><p>Product not found.</p></Container>;

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete ${product.title}?`)) return;

    setIsDeleting(true);

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Deleted item data returned by API:", json);
        setShowSuccess(true);
        setIsDeleting(false);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        setIsDeleting(false);
      });
  };

  return (
    <Container className="mt-3 text-center">
      {showSuccess ? (
        <>
            <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
                Success! The product has been "deleted" from the database.
                Redirecting to home in <strong>{countdown}</strong> seconds...
            </Alert>
            <Button as={Link} to="/" variant="primary" size="lg">
                Return to Home Now
            </Button>
        </>
    ) : (

        <Button 
            variant="danger" 
            onClick={handleDelete} 
            disabled={isDeleting}
        >
            {isDeleting ? 'Deleting...' : 'Delete Product'}
        </Button>
    )}
    </Container>
  );
}

export default DeleteProduct;