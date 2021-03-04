import {combineReducers} from 'redux'
import userReducer from './user'
import productsReducer from './Products'
import singleProductReducer from './singleProduct'
const appReducer = combineReducers({
  user: userReducer,
  singleProduct: singleProductReducer,
  products: productsReducer
})

export default appReducer
