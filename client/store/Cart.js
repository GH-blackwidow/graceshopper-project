import axios from 'axios'

//ACTION TYPE
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

//ACTION CREATORS
const getCart = cart => ({
  type: GET_CART,
  cart
})
const updateCart = newCart => ({
  type: UPDATE_CART,
  newCart
})
const addToCart = item => ({
  type: ADD_TO_CART,
  item
})
const deleteFromCart = deletedItem => ({
  type: DELETE_FROM_CART,
  deletedItem
})

//THUNK CREATORS
//pass null to userId if someone is not signed in
export const fetchCart = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/cart/${userId}`)
    dispatch(getCart(cart))
  } catch (err) {
    console.log('Can not retrieve cart', err)
  }
}
export const editCart = (userId, newCart) => async dispatch => {
  try {
    console.log('this is my thunks')
    await axios.put(`/api/cart/${userId}`, newCart)
    console.log(newCart)
    dispatch(updateCart(newCart))
  } catch (err) {
    console.log('Can not update cart', err)
  }
}
export const addToCartThunk = (orderId, item) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/${orderId}`, item)
      if (data) {
        dispatch(addToCart(data))
      }
    } catch (err) {
      console.log('add to cart thunk error: ', err)
    }
  }
}
export const deleteFromCartThunk = (orderId, item) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${orderId}`, item)
      if (data) {
        dispatch(deleteFromCart(data))
      }
    } catch (err) {
      console.log('add to cart thunk error: ', err)
    }
  }
}

//INITIAL STATE
const defaultCart = {}

//REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.item]
    case UPDATE_CART:
      console.log('updating cart')
      return action.newCart
    default:
      return state
  }
}
