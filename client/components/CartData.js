import React from 'react'
import {connect} from 'react-redux'
import UpdateCart from './UpdateCart'
import {deleteFromCartThunk} from '../store/Cart'

class CartData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const {product, user} = this.props
    const {products} = this.props.cart || []
    const quantity = products.map(cartItem => {
      if (cartItem.id === product.id) {
        return cartItem.orderProducts.quantity
      }
    })
    return (
      <div id="cart">
        <h3>{product.name}</h3>
        <h4>Price: ${product.price}</h4>
        <h4>Quantity:{quantity}</h4>
        {/* <UpdateCart /> */}
        <button
          type="submit"
          onClick={() =>
            this.props.deleteFromCartThunk(
              product.orderProducts.orderId,
              product.id,
              user.id
            )
          }
        >
          Remove Item
        </button>
      </div>
    )
  }
}
const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  deleteFromCartThunk: (orderId, itemId) =>
    dispatch(deleteFromCartThunk(orderId, itemId))
})

export default connect(mapState, mapDispatch)(CartData)
