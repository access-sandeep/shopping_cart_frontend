import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../layouts/BeforeLogin.css'
import { loginRequest } from '../features/auth/authSlice'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isSuccess } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log('LoginForm useEffect triggered. isSuccess:', isSuccess);
    if (isSuccess) {
      window.location.href = '/home'  // Redirect to products page after successful login
    }
  }, [isSuccess, navigate])

  let handleSubmit = (e) => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    let rememberMe = e.target.remember.checked

    let payload = {
      email: email,
      password: password,
    }

    console.log('Payload and Remember me:', payload, rememberMe)
    dispatch(loginRequest(payload))
  }

  return (
    <div className="before-login-container">
      <div className="before-login-card">
        <h2>Welcome Back</h2>
        <p>Log in to access your cart, view products, and manage your account.</p>

        <form className="before-login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" />
          </div>

          <div className="before-login-actions">
            <label className="checkbox-label">
              <input type="checkbox" id="remember" /> Remember me
            </label>
            <Link className="link" to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="primary-button">
            Sign In
          </button>
        </form>

        <div className="before-login-footer">
          New here? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
