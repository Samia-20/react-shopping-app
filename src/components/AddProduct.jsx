import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatableSelect from 'react-select/creatable';
import 'react-toastify/dist/ReactToastify.css';
const AddProduct = ({onStateChange}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [manufacturer, setManufacturer] = useState('');
  const [availableItems, setAvailableItems] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    // Fetch categories from your API or data source
    // This is a placeholder - replace with your actual data fetching logic
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products/categories'); // Replace with your API endpoint
        const data = await response.json();

        // Format categories for CreatableSelect
        const formattedCategories = data.map(cat => ({ value: cat, label: cat }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


const handleCategoryChange = (newValue) => {
    setSelectedCategory(newValue);
    setCategory(newValue ? newValue.value : ''); // Update your existing category state
  };

  const submitProduct = async (event) => {
    event.preventDefault();
  
    // Define productData at a higher scope
    const productData = {
      name,
      category: selectedCategory ? selectedCategory.value : '',
      manufacturer,
      availableItems: parseInt(availableItems, 10), // Ensure this is an integer
      price: parseFloat(price), // Ensure this is a double
      imageUrl, // Ensure this field name matches your DTO
      description: productDescription, // Map to the correct DTO field
    };
  
    if (!name || !selectedCategory || !manufacturer || !availableItems || !price) {
      toast.error('Please enter all required fields!', {
        // ...existing toast configuration
      });
    } else {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(productData),
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong with the request');
        }
  
        // Handle the response here
        const responseData = await response.json();
        toast('Product added successfully!', {
          // ...existing toast configuration for success
        });
  
        // Use productData here if needed
        if (typeof onStateChange === 'function') {
          onStateChange(responseData);
        }
  
      } catch (error) {
        toast.error('Error adding product: ' + error.message, {
          // ...existing toast configuration for error
        });
      }
    }
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
        <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</Typography>
        <form onSubmit={submitProduct} noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            placeholder="Name*"
          />
           <CreatableSelect
        isClearable
        onChange={handleCategoryChange}
        value={selectedCategory}
        options={categories} // Provide formatted categories here
        placeholder="Select or create a category"
      />
          <TextField
            label="Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
            fullWidth
            placeholder="Manufacturer*"
          />
          <TextField
            label="Available Items"
            value={availableItems}
            onChange={(e) => setAvailableItems(e.target.value)}
            required
            fullWidth
            placeholder="Available Items*"
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            fullWidth
            placeholder="Land Mark"
          />
          <TextField
            label="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            fullWidth
            placeholder="Product Description*"
          />
          
          <Button type="submit" color="primary" variant="contained" style={{ backgroundColor: '#304FFE', marginTop: '20px' }}>SAVE PRODUCT / NEXT</Button>
        </form>
        
      </Paper>
    </div>
  );
};

export default AddProduct;
