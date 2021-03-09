import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartData from './CartData'
import Checkout from './Checkout'
import {fetchCart, checkoutFromCartThunk} from '../store/Cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.fetchCart(this.props.user.id)
  }
  // removes the whole cart(button or method)
  // clearCart = () => {}
  // handleCheckout = () => {
  //   this.props.cart.isCurrent = false
  //   this.props.user.id
  //     ? this.props.editCart(this.props.user, this.props.cart)
  //     : this.props.editCart(null, {})
  //   window.location.href = '/checkout'
  // }

  render() {
    const {cart} = this.props
    const products = cart.products || []
    const cartInfo = (
      <div>
        {products.map(product => (
          <CartData product={product} key={product.id} />
        ))}
        <div>
          <button type="submit" onClick={this.handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    )
    let cartDisplay =
      products.length === 0 ? <p>Your cart is empty</p> : cartInfo
    return (
      <div>
        <h2>Your Cart</h2>
        {cartDisplay}
      </div>
    )
  }
}
const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId)),
  checkoutFromCartThunk: userId => dispatch(checkoutFromCartThunk(userId))
})

export default connect(mapState, mapDispatch)(Cart)
