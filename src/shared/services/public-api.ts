import axios from 'axios'
import { REST_API_BASE_URL } from '../constants'

export const apiClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
