import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import cartReducer from '../features/cart/cartSlice.js'
import productsReducer from '../features/products/productsSlice.js'

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
})

export default rootReducer
