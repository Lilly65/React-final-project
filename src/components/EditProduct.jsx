import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

function CreateProduct() {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: 'https://i.pravatar.cc', // FakeStoreAPI usually needs an image URL
    category: ''
  });

  const { id } = useParams(); // Extracts the "id" from the URL
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

      fetch('https://fakestoreapi.com/products', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: product.title,
      price: Number(product.price),
      description: product.description,
      category: product.category
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      // data is the successful response from the API
      console.log("Success from API:", data);
      setMessage(`Success! Updated product "${data.title}" with ID: ${id}`);
      
      // Optional: Clear the form after success
      //setProduct({ title: '', price: '', description: '', category: '' });
    })
    .catch((err) => {
      console.error("Error:", err);
      setMessage("Failed to create product. Check console for details.");
    });
  };  

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card className="p-4 shadow">
        <h2 className="mb-4">Create New Product</h2>
        {message && <Alert variant="success">{message}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control 
              name="title" 
              value={product.title}
              placeholder="e.g. Blue Cotton Shirt" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control 
              name="price" 
              value={product.price}
              type="number" 
              placeholder="0.00" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" onChange={handleChange} value={product.category} required>
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              name="description" 
              value={product.description}
              as="textarea" 
              rows={3} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 p-2">
            Submit Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default CreateProduct;