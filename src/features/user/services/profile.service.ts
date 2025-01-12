import authorizedHttpServer from '@/shared/services/authorizedHttp'

import { ProfilePayloadDTO } from '../types'

class ProfileService {
  async updateProfile(payload: ProfilePayloadDTO) {
    return authorizedHttpServer
      .post('/authentication/profile/update/', payload)
      .then((response) => {
        return response
      })
  }

  async getProfile() {
    return authorizedHttpServer
      .get('/authentication/profile/get/')
      .then((response) => {
        return response
      })
  }
}

const profileService = new ProfileService()

export default profileService
