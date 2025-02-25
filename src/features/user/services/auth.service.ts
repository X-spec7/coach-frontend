import httpPublic from '@/shared/services/httpPublic'
import tokenService from './token.service'

import {
  LoginPayloadDTO,
  RegisterPayloadDTO,
  LoginResponseDTO,
  RegisterResponseDTO,
} from '../types'
import axios from 'axios'

class AuthService {
  async register(payload: RegisterPayloadDTO): Promise<RegisterResponseDTO> {
    return httpPublic
      .post('/authentication/register/', payload)
      .then((response) => {
        return {
          ...response.data,
          status: response.status
        }
      })
  }
  
  async login(payload: LoginPayloadDTO): Promise<LoginResponseDTO> {
    return axios
      .post('/api/auth/login', payload, { withCredentials: true })
      .then((response) => ({
        ...response.data,
        status: response.status
      }))
  }

  logout() {
    tokenService.removeLocalAccessToken()
  }
}

const authService = new AuthService()

export default authService
