import React from 'react'
import {connect} from 'react-redux'
import {
  deleteFromCartThunk,
  addToCartThunk,
  decrementFromCartThunk
} from '../store/Cart'

class CartData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }
  handleIncrement(evt) {
    evt.preventDefault()
    this.props.addToCartThunk(this.props.user.id, evt.target.name)
  }
  handleDecrement(evt) {
    evt.preventDefault()
    this.props.decrementFromCartThunk(this.props.user.id, evt.target.name)
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
        <img src={product.imgUrl} alt={product.name} style={{width: '100px'}} />
        <h4>Price: ${product.price}</h4>
        <div>
          <button
            type="button"
            onClick={evt => this.handleIncrement(evt)}
            className="button"
            name={product.id}
          >
            +
          </button>
          <h4>Quantity:{quantity}</h4>
          <button
            type="button"
            onClick={evt => this.handleDecrement(evt)}
            className="button"
            name={product.id}
          >
            -
          </button>
        </div>
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
    dispatch(deleteFromCartThunk(orderId, itemId)),
  addToCartThunk: (userId, productId) =>
    dispatch(addToCartThunk(userId, productId)),
  decrementFromCartThunk: (userId, productId) =>
    dispatch(decrementFromCartThunk(userId, productId))
})

export default connect(mapState, mapDispatch)(CartData)
