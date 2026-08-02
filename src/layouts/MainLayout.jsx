import { Link, Outlet } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="text-4xl font-bold text-blue-500">Shopping Cart</h1>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="app-nav-button">
                {open ? 'Close Menu' : 'Open Menu'}
              </Disclosure.Button>
              <Disclosure.Panel className="app-nav-panel">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
