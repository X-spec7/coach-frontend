import {
  getTrainers,
  getTotalTrainersCount,
  getTrainerById
} from '@/dev/api'
import {
  GetTrainersPayloadDTO,
  GetTrainersResponseDTO,
  GetTotalTrainersCountPayloadDTO,
  GetTotalTrainersCountResponseDTO,
  GetTrainerByIdPayloadDTO,
  GetTrainerByIdResponseDTO
} from '../types/trainer.dto'
import authorizedHttpServer from '@/shared/services/authorizedHttp'

class TrainersService {
  async getTrainers(
    payload: GetTrainersPayloadDTO
  ): Promise<GetTrainersResponseDTO> {
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

  async getTotalTrainersCount(
    payload: GetTotalTrainersCountPayloadDTO
  ): Promise<GetTotalTrainersCountResponseDTO> {
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

  async getTrainerById(
    payload: GetTrainerByIdPayloadDTO
  ): Promise<GetTrainerByIdResponseDTO> {
    const params = new URLSearchParams()
    if (payload.trainerId) {
      params.append('trainerId', payload.trainerId.toString())
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

const trainersService = new TrainersService()

export default trainersService
