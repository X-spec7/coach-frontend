import {
  GetClassesRequestDTO,
  GetClassesResposneDTO,
} from '../types'
import {
  BookClassRequestDTO,
  BookClassResponseDTO,
  CreateClassRequestDTO,
  CreateClassResponseDTO,
  GetClassByIdRequestDTO,
  GetClassByIdResponseDTO,
  JoinClassSessionRequestDTO,
  JoinClassSessionResponseDTO,
  StartClassSessionRequestDTO,
  StartClassSessionResponseDTO
} from '../types/class.dto'
import axios, { AxiosInstance } from 'axios'

class ClassService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    this.httpClient = httpClient || axios.create({ baseURL: 'api/classes' })
  }

  async createClass(
    payload: CreateClassRequestDTO
  ): Promise<CreateClassResponseDTO> {
    return this.httpClient
      .post('/create', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async getClassById(
    payload: GetClassByIdRequestDTO
  ): Promise<GetClassByIdResponseDTO> {
    return this.httpClient
      .get(`/classes/get/${payload.classId}/`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data,
        }
      })
  }

  async getClasses(
    payload: GetClassesRequestDTO
  ): Promise<GetClassesResposneDTO> {
    const params = new URLSearchParams()

    if (payload.limit) {
      params.append('limit', payload.limit.toString())
    }
    if (payload.offset) {
      params.append('offset', payload.offset.toString())
    }
    if (payload.query) {
      params.append('query', payload.query.toString())
    }
    if (payload.category) {
      params.append('category', payload.category.toString())
    }
    if (payload.level) {
      params.append('level', payload.level.toString())
    }

    return this.httpClient
      .get(`?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async bookClass(
    payload: BookClassRequestDTO
  ): Promise<BookClassResponseDTO> {
    return this.httpClient
      .post(`/classes/book/${payload.classId}/`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data,
        }
      })
  }

  async getClassSessionStartUrl(
    payload: StartClassSessionRequestDTO
  ): Promise<StartClassSessionResponseDTO> {
    return this.httpClient
      .get(`/classes/session/start/${payload.classSessionId}/`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async getClassSessionJoinUrl(
    payload: JoinClassSessionRequestDTO
  ): Promise<JoinClassSessionResponseDTO> {
    return this.httpClient
      .get(`/classes/session/join/${payload.classSessionId}/`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }
}

const classService = new ClassService()

export default classService
