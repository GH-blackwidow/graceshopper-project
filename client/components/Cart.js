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
    const cart = this.props.cart.products || []
    cart.sort(function(a, b) {
      return a.id - b.id
    })
    const products = cart || []
    let subTotal = 0
    if (products.length !== 0) {
      subTotal = parseFloat(
        products
          .map(product => product.orderProducts.quantity * product.price)
          .reduce((a, b) => a + b, 0)
      ).toFixed(2)
    }
    const cartInfo = (
      <div>
        {products.map(product => (
          <CartData product={product} key={product.id} />
        ))}
        <h4>Total: {subTotal}</h4>
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
