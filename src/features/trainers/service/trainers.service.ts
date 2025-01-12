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
} from '../types/trainer.type'

class TrainersService {
  async getTrainers(
    payload: GetTrainersPayloadDTO
  ): Promise<GetTrainersResponseDTO> {
    const response = await getTrainers(payload)
    return response
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
