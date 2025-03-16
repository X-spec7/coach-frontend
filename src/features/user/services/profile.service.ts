import {
  GetProfileResponseDTO,
  UpdateCoachProfilePayloadDTO,
  UpdateCoachProfileResponseDTO,
  UpdateClientProfilePayloadDTO,
  UpdateClientProfileResponseDTO,
} from '../types'
import axios, { AxiosInstance } from 'axios'

class ProfileService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    this.httpClient = httpClient || axios.create({ baseURL: 'api/profile' })
  }

  async updateCoachProfile(
    payload: UpdateCoachProfilePayloadDTO
  ): Promise<UpdateCoachProfileResponseDTO> {
    return this.httpClient
      .post('/update-coach', payload)
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
    return this.httpClient
      .post('/update-client', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async getProfile(): Promise<GetProfileResponseDTO> {
    return this.httpClient
      .get('')
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
