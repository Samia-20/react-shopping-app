import React from 'react'
import "./ConfirmOrder.css"
import { useLocation } from 'react-router';

const ConfirmOrder = ({onStateChange , product, quantity , address  }) => {
    
  /*  const location = useLocation();
   const product = location.state.product;
   const quantity = location.state.quantity;
   const address = location.state.address;*/
   console.log('Received product:', product);
    console.log('Received quantity:', quantity);
    console.log('Received address:', address);
    return (
      
      <div className='confirmPageContainer'>
          <div className='confirmPageLeft'>
          <h3>{product.name}</h3>
          <div className='description' style={{font: 'message-box'}}>
            <p><b>Category:</b>{product.category}</p>
            <p>{product.description}</p>
            <p><b>Ordered Quantity:</b> {quantity}</p>
            <p ><b>Total Price:</b> ₹ {product.price * quantity}</p>
          </div>
            
          </div>
          <div className='confirmPageRight'>
            <h3>Address Details</h3>
            <div className='description' style={{font: 'message-box'}}>
              <p>{address.name} <br/> Contact Number: {address.contactNumber} <br/> {address.street} <br/> {address.landmark} <br/> {address.city} <br/> {address.state} <br/> {address.zipcode}</p> 
            </div>
          </div>

          
      </div>
    );
}

export default ConfirmOrder
