import { useState } from 'react'
import { getProfile } from '../api/api'
import { useOrderStore } from '../stores/orderStore.js'

function UserPanel({ email, onLogout }) {
  const [profile, setProfile] = useState(null)
  const orders = useOrderStore((state) => state.orders)
  const fetchOrders = useOrderStore((state) => state.fetchOrders)

  const fetchProfile = async () => {
    const data = await getProfile()
    setProfile(data)
  }

  return (
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
      <button onClick={fetchOrders}>Rendeléseim</button>
      {orders.length > 0 && (
        <div>
          <h2>Rendeléseim</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                {order.totalAmount} Ft - {order.status}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={onLogout}>Kijelentkezés</button>
    </div>
  )
}

export default UserPanel
