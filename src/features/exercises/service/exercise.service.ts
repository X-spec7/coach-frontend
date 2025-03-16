import { authorizedHttpClient } from '@/shared/services'

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
import axios, { AxiosInstance } from 'axios'

class ExerciseService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    this.httpClient = httpClient || axios.create({ baseURL: 'api/exercises' })
  }

  async getExercises(
    payload: GetExercisesRequestDTO
  ): Promise<GetExercisesResponseDTO> {
    const params = new URLSearchParams()
    if (payload.query) {
      params.append('query', payload.query)
    }
    params.append('limit', payload.limit.toString())
    params.append('offset', payload.offset.toString())

    return this.httpClient
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
    return this.httpClient
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
    return this.httpClient
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
    return this.httpClient
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
