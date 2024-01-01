import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const AddressBar = ({onStateChange}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/api/addresses', {
          method: 'GET',
          headers: {
            'x-auth-token': `${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setAddresses(data);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  // Handle address selection
  const handleAddressSelect = (event) => {
    const selected = addresses.find(addr => addr._id === event.target.value);
    if (selected) {
      setName(selected.name);
      setStreet(selected.street);
      setCity(selected.city);
      setState(selected.state);
      setLandmark(selected.landmark);
      setZipCode(selected.zipcode);
      setContactNumber(selected.contactNumber);
      setSelectedAddress(selected._id);
    }
  };

  const submitAddress = async (event) => {
    event.preventDefault();
    if (`${name}` === ''  || `${street}` === '' 
    || `${city}` === ''  || `${state}` === ''
    || `${zipcode}` === ''  || `${contactNumber}` === '') {
      toast.error('Please enter all required fields!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    else {
      const token = localStorage.getItem('token');
      
      const addressDetails = { name, street, city, state, landmark, zipcode, contactNumber };
      const response = await fetch('http://localhost:8080/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'x-auth-token': token, // Include this if you have a token variable for authentication
        },
        body: JSON.stringify(addressDetails),
      });
      if (response.status === 200) {
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
    }
   navigate('/confirm-order');
  }};

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
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Select Address</InputLabel>
          <Select
            value={selectedAddress}
            onChange={handleAddressSelect}
            label="Select Address"
          >
            {addresses.map((address) => (
              <MenuItem key={address._id} value={address._id}>
                {`${address.name}, ${address.street}, ${address.city}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            placeholder="Land Mark"
          />
          <TextField
            label="ZipCode"
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            fullWidth
            placeholder="Zip Code*"
          />
          
          <Button type="submit" color="primary" variant="contained" style={{ backgroundColor: '#304FFE', marginTop: '20px' }}>SAVE ADDRESS / NEXT</Button>
        </form>
        
      </Paper>
    </div>
  );
};

export default AddressBar;
