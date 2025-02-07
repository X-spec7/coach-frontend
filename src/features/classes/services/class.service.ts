import authorizedHttpServer from '@/shared/services/authorizedHttp'
import {
  GetClassesRequestDTO,
  GetClassesResposneDTO,
} from '../types'
import { CreateClassRequestDTO, CreateClassResponseDTO } from '../types/class.dto'

class ClassService {
  async createClass(
    payload: CreateClassRequestDTO
  ): Promise<CreateClassResponseDTO> {
    return authorizedHttpServer
      .post('/classes/create/', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
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

    return authorizedHttpServer
      .get(`/classes/get/?${params.toString()}`)
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
