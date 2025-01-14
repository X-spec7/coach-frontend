import { getSessionsMockApi } from '@/dev/api/session'
import { GetSessionsRequestDTO, GetSessionsResponseDTO } from '../types'

class ClientSessionService {
  getSessions = async (request: GetSessionsRequestDTO): Promise<GetSessionsResponseDTO> => {
    return getSessionsMockApi(request)
  }
}

const clientSessionService = new ClientSessionService()

export default clientSessionService