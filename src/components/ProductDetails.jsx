import React from 'react'
import { useLocation } from 'react-router-dom';
import "./ProductDetails.css"
export default function ProductDetails() {
  
    const location = useLocation();
  const product = location.state.product;

  return (
    <div className='productDetailContainer'>
        <div className='productLeft'>
        <img style={{width:300,height:300,marginLeft:300}} src={product.image} alt={product.title} />
        </div>
        <div className='productRight'>
        <h3>{product.title}</h3>
        <p>Category: {product.category}</p>
      <p>{product.description}</p>
      <p>Price: ₹ {product.price}</p>
      <div class="orderQuantityBox">
        <input type="number" class="form-control" placeholder="Enter Quantity"/>
    </div>
      <button type="button" class="btn btn-primary" >PLACE ORDER</button>
        </div>
    </div>
  );
  
}
