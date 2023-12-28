import React from 'react'

function ConfirmOrder({address,product}) {
  return (
    <div>
      Address Details: {address}; productid: {product.id}
    </div>
  )
}

export default ConfirmOrder
