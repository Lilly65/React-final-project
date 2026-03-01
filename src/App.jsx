import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Products from './components/Products';
import NotFound from './components/NotFound';
import ProductPage from './components/ProductPage';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct'
import DeleteProduct from './components/DeleteProduct'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product-creation" element={<CreateProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/product/delete/:id" element={<DeleteProduct />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;