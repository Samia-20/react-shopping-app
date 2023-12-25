// NavBar.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // This function should handle the logout logic and update the 'user' state
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          upGrad E-Shop
        </Typography>
        {!user ? (
          // Display when no user is logged in
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>
        ) : (
          // Display when a user is logged in
          <>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            {user.isAdmin && <Button color="inherit" component={Link} to="/add-products">Add Products</Button>}
            {!user.isAdmin && <Button color="inherit" component={Link} to="/my-orders">My Orders</Button>}
            {/* Include other links that a logged-in user should see */}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
