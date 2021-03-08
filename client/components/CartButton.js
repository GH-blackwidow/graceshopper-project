import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editCart} from '../store/Cart'
import {toast} from 'react-toastify'

class CartButton extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.props.editCart(this.props.user.id, this.props.product)
    toast.success('Item Added To Cart', {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true
    })
  }

  render() {
    console.log('user---->', this.props.user)
    return (
      <div>
        <button type="button" onClick={this.handleOnClick} className="button">
          ADD TO CART
        </button>
      </div>
    )
  }
}
const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    editCart(userId, product) {
      dispatch(editCart(userId, product))
    }
  }
}

export default connect(mapState, mapDispatch)(CartButton)
