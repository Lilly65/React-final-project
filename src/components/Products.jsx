// src/components/Users.js

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch users when component mounts
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
  <Container className="mt-5">
    {/* <h3>User List</h3> */}
    {/* 2. Wrap your data in a Table with the 'responsive' prop */}
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>
                <Link 
                    to={`/product/${product.id}`} 
                    className="text-primary text-decoration-none link-hover-blue"
                >
                    {product.title}
                </Link>
            </td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
            <td><img
                src={product.image} 
                alt={product.title}
                style={{ 
                width: '100px', 
                height: '100px', 
                objectFit: 'contain' 
            }} ></img></td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
  );
}

export default Products;