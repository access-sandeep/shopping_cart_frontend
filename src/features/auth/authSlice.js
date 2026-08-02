import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    registerRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    registerSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    },
    registerFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    },
    loginRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    },
    logoutRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    logoutSuccess: (state) => {
      state.isLoading = false
      state.user = null
    },
    logoutFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
  },
})

export const {
  reset,
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions

export default authSlice.reducer
