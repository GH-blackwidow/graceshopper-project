import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'

//ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

//THUNK CREATOR
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      console.log('this is the data ', data)
      dispatch(getProducts(data))
    } catch (err) {
      console.log('Error fetching products from server')
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
    default:
      return state
  }
}
