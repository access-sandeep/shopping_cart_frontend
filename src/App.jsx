import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import AppRoutes from './routes/AppRoutes.jsx'
import './App.css'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("sk_test_51U36br4f7JJrK01cO7I5s7l3EMEMuY2unJB54UDICWbOl3VxArsX8wepfCwwH50WLXKwqKwcgSjeroo0OPgN5hkz00ziOjpWAn");

function App() {
  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <AppRoutes />
      </Elements>
    </BrowserRouter>
  )
}

export default App
