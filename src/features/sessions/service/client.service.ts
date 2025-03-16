import { authorizedHttpClient } from '@/shared/services'
import {
  GetSessionsRequestDTO,
  GetSessionsResponseDTO,
  GetTotalSessionCountRequestDTO,
  GetTotalSessionCountResponseDTO,
  BookSessionRequestDTO,
  BookSessionResponseDTO
} from '../types'
import axios, { AxiosInstance } from 'axios'

class ClientSessionService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    this.httpClient = httpClient || axios.create({ baseURL: 'api/sessions/client' })
  }

  bookSession = async (
    request: BookSessionRequestDTO
  ): Promise<BookSessionResponseDTO> => {
    return authorizedHttpClient
      .post('/session/book/', request)
      .then((response) => {
        return response.data as BookSessionResponseDTO
      })
  }
  
  getSessions = async (
    request: GetSessionsRequestDTO
  ): Promise<GetSessionsResponseDTO> => {
    const params = new URLSearchParams()
    if (request.limit) {
      params.append('limit', request.limit.toString())
    }
    if (request.offset !== undefined) {
      params.append('offset', String(request.offset))
    }
    if (request.query) {
      params.append('query', request.query)
    }
    if (request.goal) {
      params.append('goal', request.goal)
    }
    if (request.booked !== undefined) {
      params.append('booked', String(request.booked))
    }

    return authorizedHttpClient
      .get(`/session/get/?${params.toString()}`)
      .then((response) => {
        return response.data as GetSessionsResponseDTO
      })
  }

  getTotalSessionCount = async (
    request: GetTotalSessionCountRequestDTO
  ): Promise<GetTotalSessionCountResponseDTO> => {
    const params = new URLSearchParams()
    if (request.query) {
      params.append('query', request.query)
    }
    if (request.goal) {
      params.append('goal', request.goal)
    }
    if (request.booked !== undefined) {
      params.append('booked', String(request.booked))
    }

    return authorizedHttpClient
      .get(`/session/get/count/?${params.toString()}`)
      .then((response) => {
        return response.data as GetTotalSessionCountResponseDTO
      })
  }
}

const clientSessionService = new ClientSessionService()

export default clientSessionService