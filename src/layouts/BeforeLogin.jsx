import LoginForm from '../pages/LoginForm.jsx'
import { Routes, Route } from 'react-router-dom'
import './BeforeLogin.css'
import Register from '../pages/Register'

function BeforeLogin() {
  return (
    <Routes>
        <Route index element={<LoginForm />} />
        <Route path="register" element={<Register />} />
    </Routes>
  )
}

export default BeforeLogin
