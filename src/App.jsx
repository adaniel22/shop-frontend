import './App.css'
import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth.js'
import Login from './components/Login.jsx'
import { createOrder, getProducts, getProfile } from './api/api.js'

function App() {
  const { email, login, logout } = useAuth()
  const [products, setProducts] = useState([])
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProducts().then((data) => setProducts(data))
  }, [])

  const fetchProfile = async () => {
    const data = await getProfile()
    setProfile(data)
  }

  const handleOrder = async (productId) => {
    const response = await createOrder([{ productId, quantity: 1 }])
    if (response.id) {
      alert(`Rendelés leadva! Végösszeg: ${response.totalAmount} Ft`)
    } else {
      alert('Hiba történt a rendelés során.')
    }
  }
  return (
    <div>
      <h1>Webshop</h1>
      {email ? (
        <div>
          <p>Bejelentkezve mint: {email}</p>
          <button onClick={fetchProfile}>Profil lekérése</button>
          {profile && (
            <div>
              <h2>Profil</h2>
              <p>Email: {profile.email}</p>
              <p>Id: {profile.userId}</p>
            </div>
          )}
          <button onClick={logout}>Kijelentkezés</button>
        </div>
      ) : (
        <Login onLogin={login} />
      )}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} Ft
            <button onClick={() => handleOrder(product.id)}>Rendelés</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
