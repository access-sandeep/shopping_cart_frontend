import { useEffect } from 'react'
import './PageTheme.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCartItemsRequest,
  updateQuantityRequest,
  removeItemRequest,
} from '../features/cart/cartSlice'

function Cart() {
  const dispatch = useDispatch()
  const { items, isLoading, isError, message } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCartItemsRequest())
  }, [dispatch])

  const subtotal = items?.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.product?.price || 0),
    0
  )
  const totalQuantity = items?.reduce((sum, item) => sum + (item.quantity || 0), 0)

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return
    dispatch(
      updateQuantityRequest({
        itemId: item.cart_item_id,
        quantity: newQuantity,
      })
    )
  }

  const handleRemoveItem = (item) => {
    dispatch(removeItemRequest(item.cart_item_id))
  }

  if (isLoading) {
    return <p className="tab-content">Loading cart items...</p>
  }

  if (isError) {
    return <p className="tab-content">{message || 'Unable to load cart items.'}</p>
  }

  return (
    <section className="page-card">
      <div className="page-heading">
        <div>
          <h2 className="page-title">Your Cart</h2>
          <p className="page-description">
            Review selected items, adjust quantities, and prepare for checkout.
          </p>
        </div>
        <Link className="button button-secondary" to="/products">
          Continue shopping
        </Link>
      </div>

      {items && items.length > 0 ? (
        <div className="cart-grid">
          <section className="tab-panel cart-items-panel">
            <h3 className="section-heading">Items in your cart</h3>
            <ul className="cart-items-list">
              {items.map((item) => (
                <li key={item.cart_item_id} className="cart-item">
                  <div className="cart-item-main">
                    <div>
                      <h4>{item.product?.product_name}</h4>
                      <p className="cart-item-meta">Unit price: ${item.product?.price?.toFixed(2) ?? '0.00'}</p>
                    </div>
                    <div className="cart-item-price">
                      <span>Item total</span>
                      <strong>${((item.quantity || 0) * (item.product?.price || 0)).toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button
                        type="button"
                        className="quantity-button"
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="quantity-button"
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="cart-summary">
            <h3 className="section-heading">Order summary</h3>
            <div className="summary-row">
              <span>Items</span>
              <strong>{totalQuantity}</strong>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <button type="button" className="checkout-button">
              Proceed to Checkout
            </button>
          </aside>
        </div>
      ) : (
        <div className="tab-panel">
          <p>Your cart is empty. <Link to="/products">Continue shopping</Link>.</p>
        </div>
      )}
    </section>
  )
}

export default Cart
