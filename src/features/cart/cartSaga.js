import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../services/api.js'
import { get } from 'lodash';
import {
  fetchCartIdForCurrentUser,
  fetchCartIdForCurrentUserSuccess,
  fetchCartIdForCurrentUserFailure,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  fetchCartItemsRequest,
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  removeItemRequest,
  removeItemSuccess,
  removeItemFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
} from './cartSlice';

function fetchCartApi() {
  return api.get('/cart');
}

function fetchCartItemsApi() {
  return api.get('/cart_items');
}

function addItemApi(item) {
  return api.post('/cart_item/add', item);
}

function removeItemApi(itemId) {
  return api.delete(`/cart/items/${itemId}`);
}

function updateQuantityApi(itemId, quantity) {
  return api.put(`/cart/items/${itemId}`, { quantity });
}

function* fetchCartIdForCurrentUserSaga() {
  try {
    let response = yield call(api.get, '/loggedin/user');
    let isCartIdPresent = response.data?.cart;
    if (!isCartIdPresent) {
      let user_id = get(JSON.parse(localStorage.getItem('user')), 'user_id', null);
      yield call(api.post, `/shopping_cart/add`, { user_id });
      response = yield call(api.get, '/loggedin/user');
    }
    yield put(fetchCartIdForCurrentUserSuccess(response.data));
  } catch (error) {
    yield put(fetchCartIdForCurrentUserFailure(error.message || 'Failed to fetch cart id'));
  }
}

function* fetchCartSaga() {
  try {
    const response = yield call(fetchCartApi);
    yield put(fetchCartSuccess(response.data));
  } catch (error) {
    yield put(fetchCartFailure(error.message || 'Failed to load cart'));
  }
}

function* fetchCartItemsSaga() {
  try {
    const response = yield call(fetchCartItemsApi);
    yield put(fetchCartSuccess(response.data));
  } catch (error) {
    yield put(fetchCartFailure(error.message || 'Failed to load cart items'));
  }
}

function* addItemSaga(action) {
  try {
    const response = yield call(addItemApi, action.payload);
    yield put(addItemSuccess(response.data));
  } catch (error) {
    yield put(addItemFailure(error.message || 'Failed to add item'));
  }
}

function* removeItemSaga(action) {
  try {
    yield call(removeItemApi, action.payload);
    yield put(removeItemSuccess(action.payload));
  } catch (error) {
    yield put(removeItemFailure(error.message || 'Failed to remove item'));
  }
}

function* updateQuantitySaga(action) {
  try {
    const { itemId, quantity } = action.payload;
    const response = yield call(updateQuantityApi, itemId, quantity);
    yield put(updateQuantitySuccess(response.data));
  } catch (error) {
    yield put(updateQuantityFailure(error.message || 'Failed to update quantity'));
  }
}

export default function* watchCartSagas() {
  yield all([
    takeLatest(fetchCartIdForCurrentUser.type, fetchCartIdForCurrentUserSaga),
    takeLatest(fetchCartRequest.type, fetchCartSaga),
    takeLatest(fetchCartItemsRequest.type, fetchCartItemsSaga),
    takeLatest(addItemRequest.type, addItemSaga),
    takeLatest(removeItemRequest.type, removeItemSaga),
    takeLatest(updateQuantityRequest.type, updateQuantitySaga),
  ]);
}
