import LoginForm from '../pages/LoginForm.jsx'
import { Routes, Route } from 'react-router-dom'
import './BeforeLogin.css'
import Register from '../pages/Register'

function BeforeLogin() {
  return (
    <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default BeforeLogin
