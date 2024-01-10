// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import OrderPage from './components/OrderPage';
import AddProduct from './components/AddProduct';
import ConfirmOrder from './components/ConfirmOrder';
import AddressBar from './components/AddressBar';

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (userData) => {
    setUser(userData); // This function should be passed to your login component
  };

  const handleLogout = () => {
    setUser(null); // This resets the user state, effectively logging them out
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue); // Update search term state
  };

  return (
    <BrowserRouter>
      {/* The NavBar is placed outside of Routes so it's always rendered */}
      <NavBar user={user} onLogout={handleLogout} onSearch={handleSearch}/>
      <Routes>
        {/* Define your Route components here */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage onLogin={handleLogin} />} />
        <Route path="/products" element={<ProductsPage searchTerm={searchTerm}/>} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/add-products" element={<AddProduct />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/address" element={<AddressBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
