import axios from 'axios'

//ACTION TYPE
const GET_ORDERS = 'GET_ORDERS'

//ACTION CREATORS
const getOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
})

//THUNK CREATORS
export const fetchOrders = (userId) => async (dispatch) => {
  try {
    const orders = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrders(orders))
  } catch (err) {
    console.log('Can not retrieve orders', err)
  }
}

//INITIAL STATE
const defaultOrders = {}

//REDUCER
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
