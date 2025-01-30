import {
  GetCoachesPayloadDTO,
  GetCoachesResponseDTO,
  GetTotalCoachesCountPayloadDTO,
  GetTotalCoachesCountResponseDTO,
  GetCoachByIdPayloadDTO,
  GetCoachByIdResponseDTO
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

    return authorizedHttpServer
      .get(`/users/trainers/get/?${params.toString()}`)
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

    return authorizedHttpServer
      .get(`/users/trainers/get/count/?${params.toString()}`)
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
      .get(`/users/trainer/get/?${params.toString()}`)
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
