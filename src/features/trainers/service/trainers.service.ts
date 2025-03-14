import axios, { AxiosInstance } from 'axios'

import {
  GetCoachesPayloadDTO,
  GetCoachesResponseDTO,
  GetTotalCoachesCountPayloadDTO,
  GetTotalCoachesCountResponseDTO,
  GetCoachByIdPayloadDTO,
  GetCoachByIdResponseDTO,
  ToggleCoachListedStatePayloadDTO,
  ToggleCoachListedStateResponseDTO
} from '../types/coach.dto'

class CoachesService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    // Proxy API base URL
    this.httpClient = httpClient || axios.create({ baseURL: '/api/coaches' })
  }

  async getCoaches(
    payload: GetCoachesPayloadDTO
  ): Promise<GetCoachesResponseDTO> {
    const params = new URLSearchParams()

    if (payload.limit) params.append('limit', payload.limit.toString())
    if (payload.offset !== undefined) params.append('offset', String(payload.offset))
    if (payload.query) params.append('query', payload.query)
    if (payload.specialization) params.append('specialization', payload.specialization)
    if (payload.listed) params.append('listed', payload.listed)

    return this.httpClient
      .get(`?${params.toString()}`)
      .then((response) => ({
        status: response.status,
        ...response.data
      }))
  }

  async getTotalCoachesCount(
    payload: GetTotalCoachesCountPayloadDTO
  ): Promise<GetTotalCoachesCountResponseDTO> {
    const params = new URLSearchParams()
    
    if (payload.query) params.append('query', payload.query)
    if (payload.specialization) params.append('specialization', payload.specialization)
    if (payload.listed) params.append('listed', payload.listed)

    return this.httpClient
      .get(`/count?${params.toString()}`)
      .then((response) => ({
        status: response.status,
        ...response.data
      }))
  }

  async getCoachById(
    payload: GetCoachByIdPayloadDTO
  ): Promise<GetCoachByIdResponseDTO> {
    return this.httpClient
      .get(`/${payload.coachId}`)
      .then((response) => ({
        status: response.status,
        ...response.data
      }))
  }

  async toggleCoachListedState(
    payload: ToggleCoachListedStatePayloadDTO
  ): Promise<ToggleCoachListedStateResponseDTO> {
    return this.httpClient
      .post('', payload)
      .then((response) => ({
        status: response.status,
        ...response.data
      }))
  }
}

const coachesService = new CoachesService()

export default coachesService
