import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './MainLayout.css'

function AfterLogin() {
  const [menuOpen, setMenuOpen] = useState(false)

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
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </>
  )
}

export default AfterLogin
