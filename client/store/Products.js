import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

//ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

//THUNK CREATOR
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (err) {
      console.log('Error fetching products from server')
    }
  }
}

export const deleteProductThunk = product => {
  return async dispatch => {
    try {
      await axios.delete(`/api/prdoucts/${product.id}`)
      dispatch(deleteProduct(product))
    } catch (err) {
      console.log('Could not delete product', err)
    }
  }
}

export const addProductThunk = product => {
  return async dispatch => {
    try {
      const newProduct = (await axios.post('/api/products', product)).data
      dispatch(addProduct(newProduct))
    } catch (err) {
      console.log('Could not add product', err)
    }
  }
}
//INITIAL STATE
const initialState = []

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
