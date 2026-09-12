import './App.css'
import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { getProducts } from './api/api'
import Login from './components/Login.jsx'
import UserPanel from './components/UserPanel.jsx'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'

function App() {
  const { email, login, logout } = useAuth()
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    animal: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  })

  useEffect(() => {
    getProducts(filters).then((data) => setProducts(data))
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <h1>Webshop</h1>
      {email ? (
        <UserPanel email={email} onLogout={logout} />
      ) : (
        <Login onLogin={login} />
      )}

      {email && <Cart />}

      <div>
        <input
          type="text"
          placeholder="Keresés név szerint..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        <select
          value={filters.animal}
          onChange={(e) => handleFilterChange('animal', e.target.value)}
        >
          <option value="">Minden állat</option>
          <option value="kutya">Kutya</option>
          <option value="macska">Macska</option>
          <option value="hal">Hal</option>
          <option value="madar">Madár</option>
          <option value="ragcsalo">Rágcsáló</option>
          <option value="hullo">Hüllő</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">Minden típus</option>
          <option value="eledel">Eledel</option>
          <option value="jatek">Játék</option>
          <option value="felszereles">Felszerelés</option>
          <option value="higienia">Higiénia</option>
          <option value="kiegeszito">Kiegészítő</option>
        </select>
        <input
          type="number"
          placeholder="Min. ár"
          min="0"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
        />
        <input
          type="number"
          placeholder="Max. ár"
          min="0"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
        />
      </div>

      <ProductList products={products} isLoggedIn={!!email} />
    </div>
  )
}

export default App
