// src/axios.js
import axios from 'axios'
import router from './router'

const api = axios.create({
  baseURL: 'http://localhost/login_api_lumen/public/api', // ganti sesuai base API Lumen-mu
})

// Tambahkan token ke setiap request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Tangani error token expired (401)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expired atau tidak valid
      localStorage.removeItem('token')
      localStorage.removeItem('user') // kalau ada

      alert('Sesi Anda telah habis. Silakan login kembali.')

      router.push('/login') // redirect ke halaman login
    }

    return Promise.reject(error)
  }
)

export default api
