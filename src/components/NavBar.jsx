// NavBar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography, TextField } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import { Link, useNavigate } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleSearch = (event) => {
    // Implement search functionality here
    console.log(searchTerm);
  };
  console.log('User info:', user);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          upGrad E-Shop
        </Typography>
        {user ? (
        <TextField 
        label="Search" 
        variant="outlined" 
        size="small" 
        style={{ 
          marginRight: '400px', 
          backgroundColor: '#fff', // Assuming a white background
          borderRadius: '4px', // Rounded corners
          border: '1px solid #ced4da', // Light gray border
        }} 
        InputProps={{
          style: {
            height: '35px', // Adjust height as needed
            padding: '10px', // Add padding
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
      />
        ) : null}
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            {user?.roles?.includes('ADMIN') && (
  <Button color="inherit" component={Link} to="/add-products">Add Products</Button>
)}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
