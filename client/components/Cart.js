import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import CartData from './CartData'
// import Checkout from './Checkout'
// import {fetchCart, editCart} from '../store/Cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: []
    }
  }

  //   componentDidMount() {
  //     this.props.user
  //       ? this.props.fetchCart(this.props.user.userId)
  //       : this.props.fetchCart(null)
  //   }
  //removes the whole cart(button or method)
  //   clearCart = () => {
  //     this.props.user
  //       ? this.props.editCart(this.props.user.userId, {})
  //       : this.props.editCart(null, {})
  //   }
  //   handleCheckout = () => {
  //     this.props.cart.isCurrent = false
  //     this.props.user
  //       ? this.props.editCart(this.props.user, this.props.cart)
  //       : this.props.editCart(null, {})
  //     window.location.href = '/checkout'
  //   }

  render() {
    // console.log('props===>', this.props)
    // console.log('state====>', this.state)
    const {cart} = this.props
    // const products = cart.products || []
    return (
      <div>
        <h2>Your Cart</h2>
        {/* {products.map((product) => (
          <CartData product={product} key={product.id} />
        ))}
        <div> */}
        {/* <button type="submit" onClick={this.handleCheckout}>
            Checkout
          </button> */}
        {/* </div> */}
      </div>
    )
  }
}
// const mapState = (state) => {
//   return {
//     user: state.user,
//     cart: state.cart,
//   }
// }

// const mapDispatch = (dispatch) => ({
//   fetchCart: (userId) => dispatch(fetchCart(userId)),
//   editCart: (userId, newCart) => dispatch(editCart(userId, newCart)),
// })

export default connect(null, null)(Cart)
