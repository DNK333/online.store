import axios from 'axios'

export type ApiProduct = {
  id: number
  name: string
  slug: string
  description: string
  price: string
  image: string
  category: number
  category_details?: { name: string }
  stock: number
  created_at: string
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('store_token')
  if (token) config.headers.Authorization = `Token ${token}`
  return config
})

export async function fetchProducts(params?: Record<string, string | number>) {
  const response = await api.get<ApiProduct[]>('/products/', { params })
  return response.data
}

export async function authenticate(path: 'login' | 'register', payload: Record<string, string>) {
  const response = await api.post<{ token: string; username: string }>(`/auth/${path}/`, payload)
  localStorage.setItem('store_token', response.data.token)
  return response.data
}

export async function logout() {
  await api.post('/auth/logout/')
  localStorage.removeItem('store_token')
}

export async function createOrder(payload: { name: string; phone: string; address: string }) {
  const response = await api.post('/orders/create/', payload)
  return response.data
}

export default api
