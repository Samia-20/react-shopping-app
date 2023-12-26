import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, InputAdornment } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Email as EmailIcon, Lock as LockIcon } from '@material-ui/icons';

const SignInPage = () => {
  const [email, setEmail] = useState(''); // consider setting a default value or using a placeholder
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignIn = async (event) => {
    event.preventDefault();
    navigate('/products'); // redirect to the products page
  };

  return (
    <div style={{ marginTop: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper style={{ padding: 20, maxWidth: 400, width: '100%', boxSizing: 'border-box' }}>
        <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>Sign in</Typography>
        <form onSubmit={handleSignIn} noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TextField
            label="Email Address"
            value={email}
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
