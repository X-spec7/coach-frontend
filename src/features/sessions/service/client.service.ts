import { getSessionsMockApi, getTotalSessionCountMockApi } from '@/dev/api/session'
import {
  GetSessionsRequestDTO,
  GetSessionsResponseDTO,
  GetTotalSessionCountRequestDTO,
  GetTotalSessionCountResponseDTO,
  BookSessionRequestDTO,
} from '../types'
import authorizedHttpServer from '@/shared/services/authorizedHttp'
import { JoinSessionRequestDTO, JoinSessionResponseDTO } from '../types/dto'

class ClientSessionService {
  bookSession = async (
    request: BookSessionRequestDTO
  ): Promise<BookSessionResponseDTO> => {
    return authorizedHttpServer
      .post('/session/book/', request)
      .then((response) => {
        return response
      })
  }
  
  joinSession = async (
    request: JoinSessionRequestDTO
  ): Promise<JoinSessionResponseDTO> => {
    return authorizedHttpServer
      .post('/join/', request)
      .then((response) => {
        return response
      })
  }

  getSessions = async (
    request: GetSessionsRequestDTO
  ): Promise<GetSessionsResponseDTO> => {
    const params = new URLSearchParams();
    if (request.limit) {
      params.append('limit', request.limit.toString());
    }
    if (request.offset !== undefined) {
      params.append('offset', String(request.offset));
    }
    if (request.query) {
      params.append('query', request.query);
    }
    if (request.goal) {
      params.append('goal', request.goal);
    }
    if (request.booked !== undefined) {
      params.append('booked', String(request.booked));
    }

    return authorizedHttpServer
      .get(`/session/get/?${params.toString()}`)
      .then((response) => {
        return response
      })
  }

  getTotalSessionCount = async (
    request: GetTotalSessionCountRequestDTO
  ): Promise<GetTotalSessionCountResponseDTO> => {
    const params = new URLSearchParams();
    if (request.query) {
      params.append('query', request.query);
    }
    if (request.goal) {
      params.append('goal', request.goal);
    }
    if (request.booked !== undefined) {
      params.append('booked', String(request.booked));
    }

    return authorizedHttpServer
      .get(`/session/get/count/?${params.toString()}`)
      .then((response) => {
        return response
      })
  }
}

const clientSessionService = new ClientSessionService()

export default clientSessionService