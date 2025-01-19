import httpPublic from '@/shared/services/httpPublic'

import tokenService from './token.service'
import { LoginPayloadDTO, RegisterPayloadDTO } from '../types'
import tokenUtil from '@/features/messages/utils/tokenUtils'

class AuthService {
  async register(payload: RegisterPayloadDTO) {

    return httpPublic
      .post('/authentication/register/', payload)
      .then((response) => {
        return response.data
      })
  }
  
  async login(payload: LoginPayloadDTO) {
    return httpPublic
      .post('/authentication/login/', payload)
      .then((response) => {
        if (response.data.result.token) {
          console.log('access token --------->', response.data.result.token)
          tokenService.setLocalAccessToken(response.data.result.token)
          tokenUtil.getUserId()
        }
        return response
      })
  }

  logout() {
    tokenService.removeLocalAccessToken()
  }
}

const authService = new AuthService()

export default authService
