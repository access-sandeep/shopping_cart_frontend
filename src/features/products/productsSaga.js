import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../services/api.js'
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from './productsSlice.js'

function* fetchProductsSaga() {
  try {
    const response = yield call(api.get, '/products')
    yield put(fetchProductsSuccess(response.data))
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString()
    yield put(fetchProductsFailure(message))
  }
}

export default function* productsSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga)
}
