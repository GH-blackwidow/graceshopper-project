import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/Products'
import CartButton from './CartButton'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products.products || []

    return (
      <div id="product-title">
        <h1>Beer Selection</h1>
        <div id="products">
          {products.map(product => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img
                  className="product-img"
                  src={product.imgUrl}
                  alt={product.name}
                  style={({width: '200px'}, {height: '200px'})}
                />
                <h3>{product.name}</h3>
                <h4>
                  Price
                  <strong>:{product.price}</strong>
                </h4>
                View
              </Link>
              <CartButton user={this.props.user} productId={product.id} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
