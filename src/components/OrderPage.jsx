import React from 'react'
import { useLocation } from 'react-router';
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

     const [activeStep, setActiveStep] = React.useState(0);
     const [skipped, setSkipped] = React.useState(new Set());
   
     
   
     const isStepSkipped = (step) => {
       return skipped.has(step);
     };
   
     const handleNext = () => {
       let newSkipped = skipped;
       if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
       }
   
       setActiveStep((prevActiveStep) => prevActiveStep + 1);
       setSkipped(newSkipped);
     };
   
     const handleBack = () => {
       setActiveStep((prevActiveStep) => prevActiveStep - 1);
     };
   
    
   
     const handleReset = () => {
       setActiveStep(0);
     };
   
     return (
       <Box sx={{ width: '100%' }}>
         <Stepper activeStep={activeStep}>
           {steps.map((label, index) => {
             const stepProps = {};
             const labelProps = {};
             return (
               <Step key={label} {...stepProps}>
                 <StepLabel {...labelProps}>{label}</StepLabel>
               </Step>
             );
           })}
         </Stepper>
         {activeStep === steps.length ? (
           <React.Fragment>
             <Typography sx={{ mt: 2, mb: 1 }}>
               All steps completed - you're finished
             </Typography>
             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
               <Box sx={{ flex: '1 1 auto' }} />
               <Button onClick={handleReset}>Reset</Button>
             </Box>
           </React.Fragment>
         ) : (
           <React.Fragment>
            {(activeStep === 0)?(
                
                <div className='items'>
                    <p>OrderPage quantity: {quantity}</p> 
                    <p>Product Price: {product.price}</p>
                    <p>Total Price: {product.price * quantity}</p>
                 </div>
                 
            ): (
                <Typography sx={{ mt: 2, mb: 1 }}>
               Test String
             </Typography>
            ) }
             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
               <Button
                 color="inherit"
                 disabled={activeStep === 0}
                 onClick={handleBack}
                 sx={{ mr: 1 }}
               >
                 Back
               </Button>
               <Box sx={{ flex: '1 1 auto' }} />
   
               <Button onClick={handleNext}>
                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
               </Button>
             </Box>
           </React.Fragment>
         )}
       </Box>
     );
  
}
