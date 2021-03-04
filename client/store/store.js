import {combineReducers} from 'redux'
import userReducer from './user'

import singleProductReducer from './singleProduct'
const reducer = combineReducers({
  user: userReducer,
  singleProduct: singleProductReducer
})

export default reducer
