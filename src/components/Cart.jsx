import { useCartStore } from '../stores/cartStore.js'
import { useState } from 'react'
import { createOrder } from '../api/api'
import { useOrderStore } from '../stores/orderStore.js'

function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const [message, setMessage] = useState('')
  const fetchOrders = useOrderStore((state) => state.fetchOrders)

  const handleOrder = async () => {
    const orderItems = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }))

    const response = await createOrder(orderItems)

    if (response.id) {
      setMessage(`Rendelés leadva! Végösszeg: ${response.totalAmount} Ft`)
      clearCart()
      await fetchOrders()
    } else {
      setMessage('Hiba történt a rendelés során.')
    }
  }
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  )

  if (items.length === 0) {
    return <p>A kosár üres.</p>
  }

  return (
    <div>
      <h2>Kosár</h2>
      <ul>
        {items.map((item) => (
          <li key={item.product.id}>
            {item.product.name} - {item.product.price} Ft
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.product.id, Number(e.target.value))
              }
            />
            <button onClick={() => removeItem(item.product.id)}>Törlés</button>
          </li>
        ))}
      </ul>
      <p>Végösszeg: {total} Ft</p>
      <button onClick={clearCart}>Kosár ürítése</button>
      <button onClick={handleOrder}>Megrendelés</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  )
}

export default Cart
