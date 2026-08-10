import './PageTheme.css'
import { Link } from 'react-router-dom'

function Cart() {
  return (
    <section className="page-card">
      <h2 className="page-title">Your Cart</h2>
      <p className="page-description">Review selected items, adjust quantities, and prepare for checkout.</p>
      <div className="tab-panel">
        <p>Your cart is empty. <Link to="/products">Continue shopping</Link>.</p>
      </div>
    </section>
  )
}

export default Cart
