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
    return authorizedHttpServer
      .post('/users/trainers/get/', payload)
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
    const response = await getTotalTrainersCount(payload)
    return response
  }

  async getTrainerById(
    payload: GetTrainerByIdPayloadDTO
  ): Promise<GetTrainerByIdResponseDTO | null> {
    const response = await getTrainerById(payload)
    return response
  }
}

const trainersService = new TrainersService()

export default trainersService
