import React from 'react'
import { useLocation } from 'react-router-dom';
import "./ProductDetails.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


export default function ProductDetails() {
    const [quantity, setQuantity] = useState('');
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
    const navigate = useNavigate();
    const location = useLocation();
  const product = location.state.product;
  const placeOrder = (item) => {
    toast('Order Confirmed!', {
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
        navigate("/orders",
        { state: 
         { product: product,
            quantity: quantity
         } 
        }
        )
      },2000)
  }
  return (
    
    <div className='productDetailContainer'>
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
        <div className='productLeft'>
        <img style={{width:300,height:300,marginLeft:300}} src={product.imageUrl} alt={product.name} />
        </div>
        <div className='productRight'>
        <h3>{product.title}</h3>
        <p>Category: <b>{product.category}</b></p>
      <p>{product.description}</p>
      <p >Price: ₹ {product.price}</p>
      <div class="orderQuantityBox">
        <input type="number" class="form-control" placeholder="Enter Quantity" onChange={handleQuantityChange}/>
    </div>
      <button type="button" class="btn btn-primary" onClick={placeOrder}>PLACE ORDER</button>
        </div>
    </div>
  );
  
}
