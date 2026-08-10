import axios from "axios"
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-VERSION': '1.1.0',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`.replace(/"/g, ''),
  },
})

export default api
