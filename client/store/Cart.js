import axios from 'axios'

//ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DECREMENT_FROM_CART = 'DECREMENT_FROM_CART'
const CHECKOUT_FROM_CART = 'CHECKOUT_FROM_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

//ACTION CREATORS
const getCart = cart => ({
  type: GET_CART,
  cart
})
const addToCart = newCart => ({
  type: ADD_TO_CART,
  newCart
})
const decrementFromCart = editedCart => ({
  type: DECREMENT_FROM_CART,
  editedCart
})
const checkoutFromCart = emptyCart => ({
  type: CHECKOUT_FROM_CART,
  emptyCart
})

const deleteFromCart = updatedCart => ({
  type: DELETE_FROM_CART,
  updatedCart
})

//THUNK CREATORS
//pass null to userId if someone is not signed in
export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(getCart(data))
  } catch (err) {
    console.log('Can not retrieve cart', err)
  }
}

export const addToCartThunk = (userId, productId) => {
  return async dispatch => {
    try {
      await axios.post(`/api/cart/add`, {userId, productId})
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(addToCart(data))
    } catch (err) {
      console.log('add to cart thunk error: ', err)
    }
  }
}
export const decrementFromCartThunk = (userId, product) => {
  return async dispatch => {
    try {
      await axios.post(`/api/cart/decrement`, {userId, product})
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(decrementFromCart(data))
    } catch (err) {
      console.log('add to cart thunk error: ', err)
    }
  }
}
export const checkoutFromCartThunk = userId => {
  return async dispatch => {
    try {
      await axios.post(`/api/cart/checkout`, userId)
      dispatch(checkoutFromCart({}))
    } catch (err) {
      console.log('unable to checkout: ', err)
    }
  }
}

//Delete whole thing thunk
export const deleteFromCartThunk = (orderId, itemId, userId) => {
  return async dispatch => {
    try {
      await axios.delete(`api/cart/${orderId}/${itemId}`)
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(deleteFromCart(data))
    } catch (err) {
      console.log('delete from cart thunk error: ', err)
    }
  }
}

//INITIAL STATE
const defaultCart = []

//REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return action.newCart
    case DECREMENT_FROM_CART:
      return action.editedCart
    case CHECKOUT_FROM_CART:
      return action.emptyCart
    case DELETE_FROM_CART:
      return action.updatedCart
    default:
      return state
  }
}
