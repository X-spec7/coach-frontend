import authorizedHttpServer from '@/shared/services/authorizedHttp'

import {
  UpdateProfilePayloadDTO,
  GetProfileResponseDTO,
  UpdateProfileResponseDTO,
} from '../types'

class ProfileService {
  async updateProfile(payload: UpdateProfilePayloadDTO): Promise<UpdateProfileResponseDTO> {
    return authorizedHttpServer
      .post('/authentication/profile/update/', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data,
        }
      })
  }

  async getProfile(): Promise<GetProfileResponseDTO> {
    return authorizedHttpServer
      .get('/authentication/profile/get/')
      .then((response) => {
        return {
          status: response.status,
          ...response.data,
        }
      })
  }
}

const profileService = new ProfileService()

export default profileService
