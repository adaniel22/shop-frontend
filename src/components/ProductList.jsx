import { createOrder } from '../api/api'
import { useOrderStore } from '../stores/orderStore.js'
import { useState } from 'react'

function ProductList({ products, isLoggedIn }) {
  const [message, setMessage] = useState('')
  const fetchOrders = useOrderStore((state) => state.fetchOrders)
  const handleOrder = async (productId) => {
    const response = await createOrder([{ productId, quantity: 1 }])
    if (response.id) {
      setMessage(`Rendelés leadva! Végösszeg: ${response.totalAmount} Ft`)
      await fetchOrders()
    } else {
      setMessage('Hiba történt a rendelés során.')
    }
  }

  return (
    <div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} Ft
            {isLoggedIn && (
              <button onClick={() => handleOrder(product.id)}>Rendelés</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
