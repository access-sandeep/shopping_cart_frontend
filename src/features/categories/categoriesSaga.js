import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../services/api.js'
import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from './categoriesSlice.js'

function* fetchCategoriesSaga() {
  try {
    const response = yield call(api.get, '/categories')
    yield put(fetchCategoriesSuccess(response.data))
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString()
    yield put(fetchCategoriesFailure(message))
  }
}

export default function* categoriesSaga() {
  yield takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga)
}