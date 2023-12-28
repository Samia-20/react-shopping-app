import React from 'react'
import { useLocation } from 'react-router';
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./OrderPage.css"
import AddressBar from './AddressBar';
import ConfirmOrder from './ConfirmOrder';

const steps = ['Items','Select Address', 'Confirm Order'];

export default function OrderPage() {
     const location = useLocation();
   const product = location.state.product;
   const quantity = location.state.quantity;

   const [activeStep, setActiveStep] = useState(0);
   const [address, setAddress] = useState('');
   // Add any other necessary state for each step
 
   const handleNext = () => {
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };
 
   const handleBack = () => {
     setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };
 
   const handleAddressUpdate = (newValue) => {
    // Update the state in the parent component
    setAddress(newValue);
      setTimeout(()=>{
        setActiveStep(2);
      },2000)
   
  };

   const getStepContent = (stepIndex) => {
     switch (stepIndex) {
       case 0:
         return <ItemsStep/>;
       case 1:
         return <AddressBar onStateChange={handleAddressUpdate} />;
       case 2:
         return <ConfirmOrder address={address} product={product} />;
       default:
         return 'Unknown stepIndex';
     }
   };
   const ItemsStep = () => {
    return (
        <div className='itemContainer'>
        
      <div className='itemLeft'>
      <img style={{width:300,height:300,marginLeft:300}} src={product.image} alt={product.title} />
      </div>
      <div className='itemRight'>
      <h3>{product.title}</h3>
      <p>Category: <b>{product.category}</b></p>
    <p>{product.description}</p>
    <p >Price: ₹ {product.price}</p>
    <p> <b>Ordered Quantity:</b> {quantity}</p>
      </div>
  </div>
    );
  };


   return (
     <div>
       <Stepper activeStep={activeStep} alternativeLabel>
         {steps.map((label) => (
           <Step key={label}>
             <StepLabel>{label}</StepLabel>
           </Step>
         ))}
       </Stepper>
       <div>
         <Typography component="div" style={{ margin: '20px 0' }}>
           {getStepContent(activeStep)}
         </Typography>
         <div>
           <Button disabled={activeStep === 0} onClick={handleBack}>
             Back
           </Button>
           <Button variant="contained" color="primary" onClick={handleNext}>
             {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
           </Button>
         </div>
       </div>
     </div>
   );

  
}
