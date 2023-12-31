import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, InputAdornment } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Email as EmailIcon, Lock as LockIcon } from '@material-ui/icons';
import axios from 'axios';

const SignInPage = ({ onLogin }) => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const userData = {
        username,
        password,
      };

      const response = await axios.post('http://localhost:8080/api/auth/signin', userData);
      
      // Assuming successful login if the response is successful
      console.log('Sign in successful:', response.data);
      onLogin(response.data);

      const token = response.headers['x-auth-token'];
      localStorage.setItem('token', token);
      console.log('Token:',token);
      // Redirect to the /products page
      navigate('/products');
    } catch (error) {
      console.error('Error signing in:', error);
      setErrorMessage('Failed to sign in. Please check your credentials and try again.');
    }
  };

  return (
    <div style={{ marginTop: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper style={{ padding: 20, maxWidth: 400, width: '100%', boxSizing: 'border-box' }}>
        <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>Sign in</Typography>
        <form onSubmit={handleSignIn} noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TextField
            label="Email Address"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            placeholder="example@example.com"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            placeholder="******"
          />
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <Button type="submit" color="primary" variant="contained" style={{ backgroundColor: '#304FFE', marginTop: '20px' }}>Log In</Button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/signup" style={{ textDecoration: 'none' }}>Don't have an account? Sign up</a>
        </div>
      </Paper>
    </div>
  );
};

export default SignInPage;
