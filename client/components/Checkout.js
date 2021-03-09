import React from 'react'
import {Link} from 'react-router-dom'

const Checkout = () => {
  return (
    <div
      id="checkoutContainer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h2>Confirmation of Order</h2>
      <h3>Thank you for shopping with us. Your order is placed!</h3>
      <Link to="/">Click here to continue to homepage</Link>
    </div>
  )
}
export default Checkout
