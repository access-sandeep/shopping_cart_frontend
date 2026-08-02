import { Link, Outlet } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import './AdminLayout.css'

function AdminLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Shopping Cart</h1>
        <Menu as="nav" className="app-menu">
          <Menu.Button className="app-menu-button">Navigate</Menu.Button>
          <Menu.Items className="app-menu-items">
            <Menu.Item>
              {({ active }) => (
                <Link className={active ? 'active-link' : ''} to="/">
                  Home
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link className={active ? 'active-link' : ''} to="/products">
                  Products
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link className={active ? 'active-link' : ''} to="/cart">
                  Cart
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
