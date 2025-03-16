import { authorizedHttpClient } from '@/shared/services'

import {
  GetProfileResponseDTO,
  UpdateCoachProfilePayloadDTO,
  UpdateCoachProfileResponseDTO,
  UpdateClientProfilePayloadDTO,
  UpdateClientProfileResponseDTO,
} from '../types'

class ProfileService {
  async updateCoachProfile(
    payload: UpdateCoachProfilePayloadDTO
  ): Promise<UpdateCoachProfileResponseDTO> {
    return authorizedHttpClient
      .post('/users/profile/coach/update/', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data,
        }
      })
  }

  async updateClientProfile(
    payload: UpdateClientProfilePayloadDTO
  ): Promise<UpdateClientProfileResponseDTO> {
    return authorizedHttpClient
      .post('/users/profile/client/update/', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async getProfile(): Promise<GetProfileResponseDTO> {
    return authorizedHttpClient
      .get('/users/profile/get/')
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
