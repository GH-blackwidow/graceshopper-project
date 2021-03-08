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
    this.props.editCart(this.props.productId)
    toast.success('Item Added To Cart', {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true
    })
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleOnClick} className="button">
          ADD TO CART
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    editCart(productId) {
      dispatch(editCart(productId))
    }
  }
}

export default connect(null, mapDispatch)(CartButton)
