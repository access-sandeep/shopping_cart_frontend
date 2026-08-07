import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../services/api.js'
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from './authSlice.js'

function* registerSaga(action) {
  try {
    const response = yield call(api.post, '/register/user', action.payload)
    if (response?.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    yield put(registerSuccess(response.data))
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString()
    yield put(registerFailure(message))
  }
}

function* loginSaga(action) {
  console.log('Login saga triggered with payload:', action.payload, api.post)
  try {
    const response = yield call(api.post, '/login', action.payload)
    if (response?.data) {
      const userData = yield call(api.get, '/loggedin/user', {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      localStorage.setItem('token', JSON.stringify(response.data.token))
      localStorage.setItem('user', JSON.stringify(userData.data))
    }
    yield put(loginSuccess(response.data))
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString()
    yield put(loginFailure(message))
  }
}

function* logoutSaga() {
  try {
    localStorage.removeItem('token')
    yield put(logoutSuccess())
  } catch (error) {
    const message = error.message || error.toString()
    yield put(logoutFailure(message))
  }
}

export default function* authSaga() {
  yield takeLatest(registerRequest.type, registerSaga)
  yield takeLatest(loginRequest.type, loginSaga)
  yield takeLatest(logoutRequest.type, logoutSaga)
}
