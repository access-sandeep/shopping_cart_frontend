import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
  message: '',
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    fetchCategoriesSuccess: (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    },
    fetchCategoriesFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
  },
})

export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions

export default categoriesSlice.reducer