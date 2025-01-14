import { getSessionsMockApi, getTotalSessionCountMockApi } from '@/dev/api/session'
import {
  GetSessionsRequestDTO,
  GetSessionsResponseDTO,
  GetTotalSessionCountRequestDTO,
  GetTotalSessionCountResponseDTO
} from '../types'

class ClientSessionService {
  getSessions = async (
    request: GetSessionsRequestDTO
  ): Promise<GetSessionsResponseDTO> => {
    const response = getSessionsMockApi(request)
    return response
  }

  getTotalSessionCount = async (
    request: GetTotalSessionCountRequestDTO
  ): Promise<GetTotalSessionCountResponseDTO> => {
    const response = getTotalSessionCountMockApi(request)
    return response
  }
}

const clientSessionService = new ClientSessionService()

export default clientSessionService