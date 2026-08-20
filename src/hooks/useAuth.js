import { useState } from 'react'

export function useAuth() {
  const [email, setEmail] = useState(localStorage.getItem('userEmail'))

  const login = (userEmail, token) => {
    localStorage.setItem('accessToken', token)
    localStorage.setItem('userEmail', userEmail)
    setEmail(userEmail)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userEmail')
    setEmail(null)
  }

  return { email, login, logout }
}
