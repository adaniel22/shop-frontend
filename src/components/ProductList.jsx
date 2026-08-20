import { createOrder } from '../api/api'
import { useOrderStore } from '../stores/orderStore.js'

function ProductList({ products, isLoggedIn }) {
  const fetchOrders = useOrderStore((state) => state.fetchOrders)
  const handleOrder = async (productId) => {
    const response = await createOrder([{ productId, quantity: 1 }])
    if (response.id) {
      alert(`Rendelés leadva! Végösszeg: ${response.totalAmount} Ft`)
      await fetchOrders()
    } else {
      alert('Hiba történt a rendelés során.')
    }
  }

  return (
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
  )
}

export default ProductList
