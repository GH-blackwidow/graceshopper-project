import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'

//ACTION CREATORS
const getProducts = products => ({type: GET_PRODUCTS, products})

//THUNK CREATOR
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.log('Error fetching products from server')
  }
}

//INITIAL STATE
const initialState = {
  products: []
}

//REDUCER
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}
