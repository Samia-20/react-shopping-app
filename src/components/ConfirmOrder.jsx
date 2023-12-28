import React from 'react'
import "./ConfirmOrder.css"

function ConfirmOrder({address,product,quantity}) {
    
    return (
      
      <div className='confirmPageContainer'>
          <div className='confirmPageLeft'>
          <img style={{width:300,height:300,marginLeft:300}} src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
            <p>Category: <b>{product.category}</b></p>
            <p>{product.description}</p>
            <p>Ordered Quantity: {quantity}</p>
            <p > Total Price: ₹ {product.price * quantity}</p>
          </div>
          <div className='confirmPageRight'>
          <h3>Address Details</h3>
          <p>{address}</p>
          </div>
      </div>
    );
}

export default ConfirmOrder
