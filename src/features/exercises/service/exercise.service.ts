import authorizedHttpClient from '@/shared/services/authorizedHttp'
import {
  CreateExerciseRequestDTO,
  CreateExerciseResponseDTO,
  DeleteExerciseRequestDTO,
  DeleteExerciseResponseDTO,
  EditExerciseRequestDTO,
  EditExerciseResponseDTO,
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

    return authorizedHttpClient
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
    return authorizedHttpClient
      .post('/exercises/create/', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async editExercise(
    payload: EditExerciseRequestDTO
  ): Promise<EditExerciseResponseDTO> {
    return authorizedHttpClient
      .post('/exercises/update/', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async deleteExercise(
    payload: DeleteExerciseRequestDTO
  ): Promise<DeleteExerciseResponseDTO> {
    return authorizedHttpClient
      .delete(`exercises/delete/${payload.exerciseId}`)
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
