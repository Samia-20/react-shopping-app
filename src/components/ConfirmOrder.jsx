import React from 'react'
import "./ConfirmOrder.css"

function ConfirmOrder({address,product,quantity}) {
    
    return (
      
      <div className='confirmPageContainer'>
          <div className='confirmPageLeft'>
          <img style={{width:150,height:150}} src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <div className='description' style={{font: 'message-box'}}>
            <p><b>Category:</b>{product.category}</p>
            <p>{product.description}</p>
            <p><b>Ordered Quantity:</b> {quantity}</p>
            <p ><b>Total Price:</b> ₹ {product.price * quantity}</p>
          </div>
            
          </div>
          <div className='confirmPageRight'>
          <h3>Address Details</h3>
          <p>{address}</p>
          </div>
      </div>
    );
}

export default ConfirmOrder
