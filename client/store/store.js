import {combineReducers} from 'redux'
import userReducer from './user'
import productsReducer from './Products'
import singleProductReducer from './singleProduct'
import cartReducer from './Cart'
import orderReducer from './Order'
const appReducer = combineReducers({
  user: userReducer,
  singleProduct: singleProductReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
})

export default appReducer
