import React from 'react'

export default class CartData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 1}
  }

  render() {
    const {product} = this.props
    return (
      <div id="cart">
        <h3>{product.name}</h3>
        <h4>Price: ${product.price}</h4>
        <h4>Quantity:{product.quantity}</h4>
        <button onClick={() => this.props.remove(product)}>Remove Item</button>
      </div>
    )
  }
}
