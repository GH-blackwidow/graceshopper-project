import React from 'react'
import {connect} from 'react-redux'
import {editCart} from '../store/Cart'

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
  editCart: (userId, newCart) => dispatch(editCart(userId, newCart))
})

export default connect(null, mapDispatch)(UpDateCart)
