import { Link } from 'react-router-dom'
import '../layouts/BeforeLogin.css'

function LoginForm() {
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Email:', e.target.email.value);
    console.log('Password:', e.target.password.value);
    console.log('Remember me:', e.target.remember.checked);
    // Handle form submission logic here
    };

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
