import { useState } from 'react'
import { login } from '../api/api.js'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await login(email, password)

    if (data.accessToken) {
      onLogin(email, data.accessToken)
    } else {
      console.log('Sikertelen bejelentkezés:', data)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Bejelentkezés</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Bejelentkezés</button>
    </form>
  )
}

export default Login
