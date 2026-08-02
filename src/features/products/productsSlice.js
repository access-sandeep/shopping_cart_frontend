import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  message: '',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    fetchProductsSuccess: (state, action) => {
      state.isLoading = false
      state.products = action.payload
    },
    fetchProductsFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
  },
})

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productsSlice.actions

export default productsSlice.reducer
