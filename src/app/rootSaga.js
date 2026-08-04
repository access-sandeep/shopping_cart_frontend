import { all, fork } from 'redux-saga/effects'
import authSaga from '../features/auth/authSaga.js'
import productsSaga from '../features/products/productsSaga.js'
import categoriesSaga from '../features/categories/categoriesSaga.js' 

export default function* rootSaga() {
  yield all([fork(authSaga), fork(productsSaga), fork(categoriesSaga)])
}
