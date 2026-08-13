import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import api from '../services/api'
import './PageTheme.css'
import './Checkout.css'

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

// Load Stripe outside the component to avoid re-creating on every render
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '15px',
      color: '#0f172a',
      fontFamily: 'inherit',
      '::placeholder': { color: '#94a3b8' },
    },
    invalid: { color: '#b91c1c' },
  },
}

function CheckoutForm({ items, subtotal, formatCurrency }) {
  const stripe = useStripe()
  const elements = useElements()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // Step 1: Ask backend to create a PaymentIntent and return clientSecret
      const { data } = await api.post('/payments/create-intent', {
        // Amount in smallest currency unit (paise for INR)
        amount: Math.round(subtotal * 100),
        currency: 'inr',
      })

      const clientSecret = data.clientSecret

      // Step 2: Confirm the card payment with Stripe
      const cardElement = elements.getElement(CardElement)
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name, email },
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,   
        },
      })

      if (error) {
        setErrorMessage(error.message)
      } else if (paymentIntent.status === 'succeeded') {
        setSuccessMessage(`Payment of ${formatCurrency(subtotal)} was successful! Order confirmed.`)
      }
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message || 'Could not initiate payment. Please try again.'
      )
    } finally {
      setIsProcessing(false)
    }
  }

  if (successMessage) {
    return (
      <div className="tab-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <p className="checkout-status checkout-status-success" style={{ fontSize: '1rem' }}>
          {successMessage}
        </p>
        <Link className="button button-secondary" to="/products" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="checkout-grid">
      {/* ── Payment form ── */}
      <form className="tab-panel checkout-form-panel" onSubmit={handleSubmit}>
        <h3>Payment details</h3>

        <div className="form-group">
          <label htmlFor="checkout-name">Full name</label>
          <input
            id="checkout-name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkout-email">Email</label>
          <input
            id="checkout-email"
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Card details</label>
          <div className="card-element-wrapper">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {errorMessage && (
          <p className="checkout-status checkout-status-error">{errorMessage}</p>
        )}

        <div className="test-card-hint">
          <strong>Sandbox test cards</strong>
          Success: 4242 4242 4242 4242 &nbsp;·&nbsp; Decline: 4000 0000 0000 9995
          &nbsp;·&nbsp; 3DS: 4000 0025 0000 3155 &nbsp;·&nbsp; Any future date &amp; any CVC
        </div>

        <button
          type="submit"
          className="pay-button"
          disabled={!stripe || isProcessing || items.length === 0}
        >
          {isProcessing ? 'Processing…' : `Pay ${formatCurrency(subtotal)}`}
        </button>
      </form>

      {/* ── Order summary ── */}
      <aside className="checkout-summary">
        <h3>Order summary</h3>
        <ul className="summary-items">
          {items.map((item) => (
            <li key={item.cart_item_id}>
              <span>
                {item.product?.product_name}{' '}
                <span style={{ color: '#94a3b8' }}>× {item.quantity}</span>
              </span>
              <span>{formatCurrency((item.quantity || 0) * (item.product?.price || 0))}</span>
            </li>
          ))}
        </ul>
        <div className="summary-row">
          <span>Items</span>
          <strong>{totalQuantity}</strong>
        </div>
        <div className="summary-row total-row">
          <span>Total</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
      </aside>
    </div>
  )
}

function Checkout() {
  const { items } = useSelector((state) => state.cart)

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(Number(value || 0))

  const subtotal = (items || []).reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.product?.price || 0),
    0
  )

  return (
    <section className="page-card">
      <div className="page-heading">
        <div>
          <h2 className="page-title">Checkout</h2>
          <p className="page-description">
            Complete your purchase securely with Stripe.
          </p>
        </div>
        <Link className="button button-secondary" to="/cart">
          Back to cart
        </Link>
      </div>

      {(!items || items.length === 0) ? (
        <div className="tab-panel">
          <p>Your cart is empty. <Link to="/products">Continue shopping</Link>.</p>
        </div>
      ) : !stripePromise ? (
        <div className="tab-panel">
          <p className="checkout-status checkout-status-error">
            Stripe is not configured. Set <code>VITE_STRIPE_PUBLISHABLE_KEY</code> in your <code>.env</code> file and restart the dev server.
          </p>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            items={items}
            subtotal={subtotal}
            formatCurrency={formatCurrency}
          />
        </Elements>
      )}
    </section>
  )
}

export default Checkout
