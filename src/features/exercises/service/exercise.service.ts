import authorizedHttpServer from '@/shared/services/authorizedHttp'
import {
  CreateExerciseRequestDTO,
  CreateExerciseResponseDTO,
  GetExercisesRequestDTO,
  GetExercisesResponseDTO,
} from '../types'

class ExerciseService {
  async getExercises(
    payload: GetExercisesRequestDTO
  ): Promise<GetExercisesResponseDTO> {
    const params = new URLSearchParams()
    if (payload.query) {
      params.append('query', payload.query)
    }
    params.append('limit', payload.limit.toString())
    params.append('offset', payload.offset.toString())

    return authorizedHttpServer
      .get(`/exercises/get/?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async createExercise(
    payload: CreateExerciseRequestDTO
  ): Promise<CreateExerciseResponseDTO> {
    return authorizedHttpServer
      .post('/exercises/create/', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }
}

const exerciseClass = new ExerciseService()

export default exerciseClass
