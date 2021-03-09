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

  render() {
    const {cart} = this.props
    const products = cart.products || []

    let subTotal = 0
    if (products.length !== 0) {
      subTotal = products
        .map(product => product.orderProducts.quantity * product.price)
        .reduce((a, b) => a + b, 0)
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
    console.log('products--->', products)

    return (
      <div>
        <h2>My Cart</h2>
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
