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
    return getSessionsMockApi(request)
  }

  getTotalSessionCount = async (
    request: GetTotalSessionCountRequestDTO
  ): Promise<GetTotalSessionCountResponseDTO> => {
    return getTotalSessionCountMockApi(request)
  }
}

const clientSessionService = new ClientSessionService()

export default clientSessionService