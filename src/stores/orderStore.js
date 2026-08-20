import { create } from 'zustand'
import { getOrders } from '../api/api'

export const useOrderStore = create((set) => ({
  orders: [],

  fetchOrders: async () => {
    const data = await getOrders()
    set({ orders: data })
  },
}))
