import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../services/api.js'
import {
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
  return api.post('/cart/items', item);
}

function removeItemApi(itemId) {
  return api.delete(`/cart/items/${itemId}`);
}

function updateQuantityApi(itemId, quantity) {
  return api.put(`/cart/items/${itemId}`, { quantity });
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

export function* watchCartSagas() {
  yield all([
    takeLatest(fetchCartRequest.type, fetchCartSaga),
    takeLatest(fetchCartItemsRequest.type, fetchCartItemsSaga),
    takeLatest(addItemRequest.type, addItemSaga),
    takeLatest(removeItemRequest.type, removeItemSaga),
    takeLatest(updateQuantityRequest.type, updateQuantitySaga),
  ]);
}
