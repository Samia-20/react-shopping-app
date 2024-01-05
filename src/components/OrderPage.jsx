import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./OrderPage.css"
import AddressBar from './AddressBar';
import ConfirmOrder from './ConfirmOrder';

const steps = ['Items','Select Address', 'Confirm Order'];

export default function OrderPage() {
     const location = useLocation();
   const selectedProduct = location.state.product;
   const quantity = location.state.quantity;
  
   const [activeStep, setActiveStep] = useState(0);
   const [customerAddress, setCustomerAddress] = useState();
   // Add any other necessary state for each step
  const navigate = useNavigate();
   const handleNext = async() => {
    if(activeStep === 2){
      /*
      toast('Order Placed Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(()=>{
          navigate("/products")
        },2000)
        */
        //Commented as we dont have orders POST method - Start
        
      const token = localStorage.getItem('token');
      //console.log('handleNext Step 2 : token ', token);
      const product = selectedProduct.id;
      //console.log('handleNext Step 2 : productId ', product);
      const address = customerAddress.id;
      //console.log('handleNext Step 2 : addressId ', address);
      const user = localStorage.getItem('userID');
      console.log('handleNext Step 2 : quantity ', quantity);
      console.log('handleNext Step 2 : userId ', user);
      
      const orderDetails = { user, product, quantity, address };
      console.log('handleNext Step 2 : request ', JSON.stringify(orderDetails));

      try {
        const response = await fetch('http://localhost:8080/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
          },
          body: JSON.stringify(orderDetails),
        });
        
        if (response.status === 200 || response.status === 201) {
          const data = await response.json();
          console.log('Order placed in DB ', data);

          toast('Order Placed Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setTimeout(()=>{
              navigate("/products")
            },2000)
        }
        else {
          console.log('Failed to place order. Status:', response.status);
          // Handle error scenarios specific to response status codes
        }
      }
      catch (error) {
        console.error('Error while creating order:', error);
        console.log('Error while creating order ', error);
      } 
      //Commented as we dont have orders POST method - End
      
    }
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };
 
   const handleBack = () => {
     setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };
 
   const handleAddressUpdate = (newValue) => {
    // Update the state in the parent component
    //console.log('newValue of Address in OrdePage', newValue);
    //console.log('old Address in handleAddressUpdate of OrdePage', address);
    setCustomerAddress(newValue);
    //console.log('updated Address in handleAddressUpdate of OrdePage', address);
    setTimeout(()=>{
      console.log('updated Address in handleAddressUpdate of OrdePage', customerAddress);
    },2000)
   
    };

   const getStepContent = (stepIndex) => {
     switch (stepIndex) {
       case 0:
         return <ItemsStep/>;
       case 1:
         return <AddressBar onStateChange={handleAddressUpdate} product={selectedProduct} quantity={quantity} selectedAddress={customerAddress}/>;
          
         //console.log('address', `{address}`);
       case 2:
          console.log('NextStep in OrdePage 2', customerAddress);
         return <ConfirmOrder address={customerAddress} product={selectedProduct} quantity={quantity} />;
       default:
        {  setTimeout(()=>{
        navigate("/products")
      },2000);} 
     }
   };
  
   const ItemsStep = () => {
    return (
        <div className='itemContainer'>
          <div className='itemLeft'>
            <img style={{width:300,height:300,marginLeft:300}} src={selectedProduct.imageUrl} alt={selectedProduct.name} />
          </div>
          <div className='itemRight'>
            <h3>{selectedProduct.name}</h3>
            <p>Category: <b>{selectedProduct.category}</b></p>
            <p>{selectedProduct.description}</p>
            <p >Price: ₹ {selectedProduct.price}</p>
            <p> <b>Ordered Quantity:</b> {quantity}</p>
          </div>
        </div>
    );
    };


   return (
     <div style={{marginTop: 30}}>
       <Stepper activeStep={activeStep} alternativeLabel>
         {steps.map((label) => (
           <Step key={label}>
             <StepLabel>{label}</StepLabel>
           </Step>
         ))}
       </Stepper>
       <div>
       <ToastContainer
            position="top-right"
            autoClose={5000}
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
         <Typography component="div" style={{ margin: '20px 0' }}>
           {getStepContent(activeStep)}
         </Typography>
         
            {activeStep < steps.length? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginLeft: 70}}>
                <Button  sx={{ mr: 1 }} disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                {activeStep !== 3 && (
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Confirm Order' : 'Next'}
                  </Button>
                )}
              </Box>
            </>
          ): (<div></div>)
          }
       </div>
     </div>
   );

  
}
