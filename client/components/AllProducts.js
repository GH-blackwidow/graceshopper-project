import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/Products'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    this.props.getProducts()
    console.log(this.props.getProducts())
  }

  render() {
    const products = this.props.products
    console.log('state is ---->', this.state)
    console.log('props is ---->', this.props)

    return (
      <div id="products">
        <h1>Beer Selection</h1>
        {products.map(product => (
          <div key={product.id}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{width: '200px'}}
            />
            <h3>{product.name}</h3>
            <Link to={`/products/${product.id}`}>View</Link>
            <p>{product.style}</p>
            <p>{product.origin}</p>
            <p>{product.alcoholContent}</p>
            <p>{product.ounces}</p>
            <h4>
              <strong>{product.price}</strong>
            </h4>
          </div>
        ))}
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
