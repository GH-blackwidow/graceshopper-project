import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editCart} from '../store/Cart'
import {toast} from 'react-toastify'

class CartButton extends Component {
  constructor() {
    super()
    this.state = {cart: {}}
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.setState({
      cart: this.props.cart
    })
  }
  handleChange(evt) {
    if (this.state.cart[evt.target.name] !== undefined) {
      const newQuantity = this.state.cart[evt.target.name] + 1
      this.setState({
        cart: {...this.state.cart, [evt.target.name]: newQuantity}
      })
    } else {
      this.setState({
        cart: {...this.state.cart, [evt.target.name]: 1}
      })
    }
  }

  handleOnClick(evt) {
    evt.preventDefault()
    this.handleChange(evt)
    this.props.editCart(this.props.user.id, {
      ...this.state.cart,
      isCurrent: true
    })
    toast.success('Item Added To Cart', {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true
    })
  }

  render() {
    const {user, productId} = this.props
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
    editCart(userId, cart) {
      dispatch(editCart(userId, cart))
    }
  }
}

export default connect(mapState, mapDispatch)(CartButton)
