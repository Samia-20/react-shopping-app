// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import OrderPage from './components/OrderPage';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData); // This function should be passed to your login component
  };

  const handleLogout = () => {
    setUser(null); // This resets the user state, effectively logging them out
  };

  return (
    <BrowserRouter>
      {/* The NavBar is placed outside of Routes so it's always rendered */}
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        {/* Define your Route components here */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage onLogin={handleLogin} />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/orders" element={<OrderPage />} />
        {/* other routes for your application */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
