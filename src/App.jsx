import './App.css'
import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { getProducts } from './api/api'
import Login from './components/Login.jsx'
import UserPanel from './components/UserPanel.jsx'
import ProductList from './components/ProductList.jsx'

function App() {
  const { email, login, logout } = useAuth()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then((data) => setProducts(data))
  }, [])

  return (
    <div>
      <h1>Webshop</h1>
      {email ? (
        <UserPanel email={email} onLogout={logout} />
      ) : (
        <Login onLogin={login} />
      )}
      <ProductList products={products} isLoggedIn={!!email} />
    </div>
  )
}

export default App
