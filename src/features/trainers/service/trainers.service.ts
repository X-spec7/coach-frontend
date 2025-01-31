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
import authorizedHttpServer from '@/shared/services/authorizedHttp'

class CoachesService {
  async getCoaches(
    payload: GetCoachesPayloadDTO
  ): Promise<GetCoachesResponseDTO> {
    const params = new URLSearchParams()
    if (payload.limit) {
      params.append('limit', payload.limit.toString())
    }
    if (payload.offset !== undefined) {
      params.append('offset', String(payload.offset))
    }
    if (payload.query) {
      params.append('query', payload.query)
    }
    if (payload.specialization) {
      params.append('specialization', payload.specialization)
    }
    if (payload.listed) {
      params.append('listed', payload.listed)
    }

    return authorizedHttpServer
      .get(`/users/coaches/get/?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async getTotalCoachesCount(
    payload: GetTotalCoachesCountPayloadDTO
  ): Promise<GetTotalCoachesCountResponseDTO> {
    const params = new URLSearchParams()
    if (payload.query) {
      params.append('query', payload.query)
    }
    if (payload.specialization) {
      params.append('specialization', payload.specialization)
    }
    if (payload.listed) {
      params.append('listed', payload.listed)
    }

    return authorizedHttpServer
      .get(`/users/coaches/get/count/?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async getCoachById(
    payload: GetCoachByIdPayloadDTO
  ): Promise<GetCoachByIdResponseDTO> {
    const params = new URLSearchParams()
    if (payload.coachId) {
      params.append('coachId', payload.coachId.toString())
    }

    return authorizedHttpServer
      .get(`/users/coach/get/?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async toggleCoachListedState(
    payload: ToggleCoachListedStatePayloadDTO
  ): Promise<ToggleCoachListedStateResponseDTO> {
    return authorizedHttpServer
      .post('/users/coach/toggle/listed/', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }
}

const trainersService = new CoachesService()

export default trainersService
