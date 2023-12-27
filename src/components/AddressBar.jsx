import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const AddressBar = () => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const navigate = useNavigate();

  const submitAddress = async (event) => {
    event.preventDefault();
    return (
    <div style={{ marginTop: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper style={{ padding: 20, maxWidth: 400, width: '100%', boxSizing: 'border-box' }}>
        <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>Address Saved</Typography>
      </Paper>
    </div>
    )
  };

  return (
    <div style={{ marginTop: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper style={{ padding: 20, maxWidth: 400, width: '100%', boxSizing: 'border-box' }}>
        <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>Add Address</Typography>
        <form onSubmit={submitAddress} noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            placeholder="Name*"
          />
          <TextField
            label="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            fullWidth
            placeholder="Contact Number*"
          />
          <TextField
            label="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            fullWidth
            placeholder="Street*"
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            fullWidth
            placeholder="City*"
          />
          <TextField
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            required
            fullWidth
            placeholder="Land Mark*"
          />
          <TextField
            label="ZipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            fullWidth
            placeholder="Zip Code*"
          />
          
          <Button type="submit" color="primary" variant="contained" style={{ backgroundColor: '#304FFE', marginTop: '20px' }}>SAVE ADDRESS</Button>
        </form>
        
      </Paper>
    </div>
  );
};

export default AddressBar;
