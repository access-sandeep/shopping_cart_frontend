import { createSlice } from '@reduxjs/toolkit'
import { filter, find, get } from 'lodash'

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  message: ''
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartIdForCurrentUser: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    fetchCartIdForCurrentUserSuccess: (state, action) => {
      state.isLoading = false
      state.userDetails = get(action, 'payload', null);
    },
    fetchCartIdForCurrentUserFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    fetchCartItemsRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    fetchCartItemsSuccess: (state, action) => {
      state.isLoading = false
    },
    fetchCartItemsFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    fetchCartRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    fetchCartSuccess: (state, action) => {
      state.isLoading = false
      const payloadItems = get(action, 'payload.items', [])
      state.items = Array.isArray(action.payload)
        ? action.payload
        : payloadItems
    },
    fetchCartFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    addItemRequest: (state, action) => {
      console.log('addItemRequest action payload:', action.payload);
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    addItemSuccess: (state, action) => {
      state.isLoading = false
      const item = get(action, 'payload', {})
      const existingItem = find(state.items, ['id', item.id])

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
    },
    addItemFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    removeItemRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    removeItemSuccess: (state, action) => {
      state.isLoading = false
      state.items = filter(state.items, (item) => item.id !== action.payload)
    },
    removeItemFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    updateQuantityRequest: (state) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    },
    updateQuantitySuccess: (state, action) => {
      state.isLoading = false
      const updatedItem = action.payload
      if (!updatedItem) return

      const existingItem = find(state.items, ['id', updatedItem.id])
      if (existingItem) {
        existingItem.quantity = updatedItem.quantity
      }
    },
    updateQuantityFailure: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    addItem: (state, action) => {
      const item = get(action, 'payload', {})
      const existingItem = find(state.items, ['id', item.id])

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      state.items = filter(state.items, (item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  fetchCartIdForCurrentUser,
  fetchCartIdForCurrentUserSuccess,
  fetchCartIdForCurrentUserFailure,
  fetchCartItemsRequest,
  fetchCartItemsSuccess,
  fetchCartItemsFailure,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  removeItemRequest,
  removeItemSuccess,
  removeItemFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
  addItem,
  removeItem,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
