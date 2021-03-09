import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, addToCartThunk} from '../store/Cart'
import {toast} from 'react-toastify'

class CartButton extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart(this.props.user.id)
  }
  handleOnClick(evt) {
    evt.preventDefault()
    this.props.addToCart(this.props.user.id, this.props.productId)
    toast.success('Item Added To Cart', {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true
    })
  }

  render() {
    const {productId} = this.props
    console.log('CART INFORMATION', this.props.cart.products)
    return (
      <div>
        <button
          type="button"
          onClick={evt => this.handleOnClick(evt)}
          className="button"
          name={productId}
        >
          ADD TO CART
        </button>
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
const mapDispatch = dispatch => {
  return {
    fetchCart: (userId, cart) => dispatch(fetchCart(userId, cart)),
    addToCart: (userId, cart) => dispatch(addToCartThunk(userId, cart))
  }
}

export default connect(mapState, mapDispatch)(CartButton)
