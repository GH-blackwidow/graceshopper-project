import React from 'react'
import {Link} from 'react-router-dom'

export default class Checkout extends React.Component {
  render() {
    return (
      <div>
        <h1>Confirmation of Order</h1>
        <p>Thank you for shopping with us. Your order is placed</p>
        <Link to="/">Click here to continue to homepage</Link>
      </div>
    )
  }
}
