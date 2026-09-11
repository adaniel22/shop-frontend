const BASE_URL = import.meta.env.VITE_API_BASE_URL

function authHeader() {
  const token = localStorage.getItem('accessToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getProducts(filters = {}) {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.animal) params.set('animal', filters.animal)
  if (filters.category) params.set('category', filters.category)
  if (filters.minPrice) params.set('minPrice', filters.minPrice)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)

  const query = params.toString()
  const url = query ? `${BASE_URL}/products?${query}` : `${BASE_URL}/products`

  const response = await fetch(url)
  return response.json()
}

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}

export async function getProfile() {
  const response = await fetch(`${BASE_URL}/auth/profile`, {
    headers: authHeader(),
  })
  return response.json()
}

export async function createOrder(items) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ items }),
  })
  return response.json()
}

export async function getOrders() {
  const response = await fetch(`${BASE_URL}/orders`, {
    headers: authHeader(),
  })
  return response.json()
}
