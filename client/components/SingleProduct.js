import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import CartButton from './CartButton'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.product || []
    return (
      <div id="single-product">
        <img src={product.imgUrl} alt={product.name} style={{width: '300px'}} />
        <h2>{product.name}</h2>
        <h4>Price:{product.price}</h4>
        <CartButton user={this.props.user} productId={product.id} />
        <h4>Description: </h4>
        <p>Alcohol Content: {product.alcoholContent}</p>
        <p>Ounces: {product.ounces}</p>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart,
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
