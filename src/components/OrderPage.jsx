import React from 'react'
import { useLocation } from 'react-router';

export default function OrderPage() {
    const location = useLocation();
  const product = location.state.product;
  const quantity = location.state.quantity;
  return (
    <div>
     <p>OrderPage quantity: {quantity}</p> 
     <p>Product Price: {product.price}</p>
     <p>Total Price: {product.price * quantity}</p>
    </div>
  )
}
