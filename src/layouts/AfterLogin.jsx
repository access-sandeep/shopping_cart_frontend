import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItemsRequest } from '../features/cart/cartSlice'
import './MainLayout.css'

function AfterLogin() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCartItemsRequest())
  }, [dispatch])

  const totalCartItems = (items || []).reduce((sum, item) => sum + (item.quantity || 0), 0)

  let logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  return (
    <>
      <header className="app-header">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">Shopping Cart</h1>
        </div>

        <button
          className="app-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={`app-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart" className="cart-menu-link">
            Cart
            {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
          </Link>
          <Link onClick={logout}>Logout</Link>
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </>
  )
}

export default AfterLogin
