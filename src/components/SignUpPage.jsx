import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    // Here, you'd typically handle the sign-up logic, e.g., post to an API
    navigate('/signin'); // redirect to the sign-in page after successful sign-up
  };

  return (
    <div style={{ marginTop: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper style={{ padding: 20, maxWidth: 400, width: '100%', boxSizing: 'border-box' }}>
        <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>Sign up</Typography>
        <form onSubmit={handleSignUp} noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            placeholder="example@example.com"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" color="primary" variant="contained" style={{ backgroundColor: '#304FFE', marginTop: '20px' }}>Sign Up</Button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/signin" style={{ textDecoration: 'none' }}>Already have an account? Sign in</a>
        </div>
      </Paper>
    </div>
  );
};

export default SignUpPage;
