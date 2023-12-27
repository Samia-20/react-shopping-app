import React from 'react'
import { useLocation } from 'react-router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Items','Select Address', 'Confirm Order'];

export default function OrderPage() {
     const location = useLocation();
   const product = location.state.product;
   const quantity = location.state.quantity;

   const [activeStep, setActiveStep] = useState(0);
   const [items, setItems] = useState([]);
   const [address, setAddress] = useState('');
   // Add any other necessary state for each step
 
   const handleNext = () => {
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };
 
   const handleBack = () => {
     setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };
 
   const getStepContent = (stepIndex) => {
     switch (stepIndex) {
       case 0:
         return <ItemsStep items={items} setItems={setItems} />;
       case 1:
         return <AddressStep address={address} setAddress={setAddress} />;
       case 2:
         return <ConfirmOrderStep items={items} address={address} />;
       default:
         return 'Unknown stepIndex';
     }
   };
   const ItemsStep = ({ items, setItems }) => {
    return (
      <div>
        <h2>Items</h2>
        {/* Add your component content for the Items step */}
      </div>
    );
  };

  const AddressStep = ({ address, setAddress }) => {
    return (
      <div>
        <h2>Enter Address</h2>
        {/* Add your component content for the Address step */}
      </div>
    );
  };

  const ConfirmOrderStep = ({ items, address }) => {
    return (
      <div>
        <h2>Confirm Order</h2>
        {/* Add your component content for the Confirm Order step */}
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
