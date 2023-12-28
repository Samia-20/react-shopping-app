import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressBar = ({onStateChange}) => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const submitAddress =  (event) => {
    event.preventDefault();
    const addressDetails = `${name}, ${street}, ${city}, ${state}, ${landmark}, ${zipCode}, ${contactNumber}`;
    toast('Address Saved!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    onStateChange(addressDetails);
   
  };

  return (
    <div style={{ marginTop: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
       <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
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
