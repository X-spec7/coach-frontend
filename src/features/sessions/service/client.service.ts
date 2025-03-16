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
    payload: BookSessionRequestDTO
  ): Promise<BookSessionResponseDTO> => {
    return this.httpClient
      .post('/book', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
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

    return this.httpClient
      .get(`?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
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

    return this.httpClient
      .get(`/count?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }
}

const clientSessionService = new ClientSessionService()

export default clientSessionService
