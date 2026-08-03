import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../layouts/BeforeLogin.css'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    secret_key: '',
    phone: '',
    user_address_id: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!/^[A-Z][a-z]+$/.test(form.first_name)) {
      nextErrors.first_name =
        'The first name should only contain alphabets and start with a capital letter.'
    }

    if (!/^[A-Z][a-z]+$/.test(form.last_name)) {
      nextErrors.last_name =
        'The last name should only contain alphabets and start with a capital letter.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'The email format is not correct.'
    }

    if (form.secret_key.length < 8) {
      nextErrors.secret_key = 'Password must be at least 8 characters long.'
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'The phone number cannot be empty.'
    }

    if (!form.user_address_id.trim() || Number(form.user_address_id) <= 0) {
      nextErrors.user_address_id = 'The address id cannot be empty and must be a positive number.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      console.log('Register payload', {
        ...form,
        is_active: true,
      })
      navigate('/')
    }
  }

  return (
    <div className="before-login-container">
      <div className="before-login-card">
        <h2>Create an account</h2>
        <p>Register to manage your cart, checkout faster, and track orders all in one place.</p>

        <form className="before-login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              placeholder="John"
            />
            {errors.first_name && <p className="field-error">{errors.first_name}</p>}
          </div>

          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Doe"
            />
            {errors.last_name && <p className="field-error">{errors.last_name}</p>}
          </div>

          <div>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="secret_key">Password</label>
            <input
              id="secret_key"
              name="secret_key"
              type="password"
              value={form.secret_key}
              onChange={handleChange}
              placeholder="Create a strong password"
            />
            {errors.secret_key && <p className="field-error">{errors.secret_key}</p>}
          </div>

          <div>
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="123-456-7890"
            />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="user_address_id">Address ID</label>
            <input
              id="user_address_id"
              name="user_address_id"
              type="number"
              value={form.user_address_id}
              onChange={handleChange}
              placeholder="1001"
            />
            {errors.user_address_id && (
              <p className="field-error">{errors.user_address_id}</p>
            )}
          </div>

          <button type="submit" className="primary-button">
            Create account
          </button>
        </form>

        <div className="before-login-footer">
          Already have an account? <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
