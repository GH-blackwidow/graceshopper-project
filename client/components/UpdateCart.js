import React from 'react'
import {connect} from 'react-redux'
import {
  addToCartThunk,
  decrementFromCartThunk,
  deleteFromCartThunk
} from '../store/Cart'

class UpDateCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: this.props.product.name,
      qty: this.props.product.quantity
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleClick(type) {
    this.props.editCart(this.state)
    this.setState(prevState => {
      return {qty: type == 'add' ? prevState.qty + 1 : prevState.qty - 1}
    })
  }
  render() {
    return (
      <div>
        Quantity: {this.state.qty}
        <div>
          <input
            type="button"
            onClick={this.handleclick.bind(this, 'add')}
            value="Increase"
          />
          <input
            type="button"
            onClick={this.handleclick.bind(this, 'sub')}
            value="Decrease"
          />
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  addToCartThunk: (userId, productId) =>
    dispatch(addToCartThunk(userId, productId)),
  decrementFromCartThunk: (userId, product) =>
    dispatch(decrementFromCartThunk(userId, productId)),
  deleteFromCartThunk: (orderId, itemId) =>
    dispatch(deleteFromCartThunk(orderId, itemId))
})

export default connect(null, mapDispatch)(UpDateCart)
