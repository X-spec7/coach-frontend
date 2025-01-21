import axios from 'axios'
import { REST_API_BASE_URL } from '../constants'

const httpPublic = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default httpPublic
