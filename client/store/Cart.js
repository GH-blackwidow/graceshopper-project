import axios from 'axios'

//ACTION TYPE
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

//ACTION CREATORS
const getCart = (cart) => ({
  type: GET_CART,
  cart,
})
const updateCart = (newCart) => ({
  type: UPDATE_CART,
  newCart,
})

//THUNK CREATORS
//pass null to userId if someone is not signed in
export const fetchCart = (userId) => async (dispatch) => {
  try {
    const cart = await axios.get(`/api/cart/${userId}`)
    dispatch(getCart(cart))
  } catch (err) {
    console.log('Can not retrieve cart', err)
  }
}
export const editCart = (userId, newCart) => async (dispatch) => {
  try {
    await axios.put(`/api/cart/${userId}`, newCart)
    dispatch(updateCart(newCart))
  } catch (err) {
    console.log('Can not update cart', err)
  }
}

//INITIAL STATE
const defaultCart = {}

//REDUCER
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.newCart
    default:
      return state
  }
}
