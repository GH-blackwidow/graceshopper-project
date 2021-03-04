import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store'

class SingleProduct extends Component {
  componentDidMount() {
    try {
      this.props.loadSingleProduct(this.props.match.params.productId)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const product = this.props.product || []
    return (
      <div id="single-product">
        <h1>{product.name}</h1>
        <h2>Price:{product.price}</h2>
        <h2>Description: </h2>
        <p>Alcohol Content: {product.alcoholContent}</p>
        <p>Ounces: {product.ounces}</p>
        <img src={product.imgUrl} alt={product.name} style={{width: '500px'}} />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
