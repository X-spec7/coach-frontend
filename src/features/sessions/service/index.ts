export { default as clientSessionService } from './client.service'
export { default as coachSessionService } from './coach.service'

import authorizedHttpServer from "@/shared/services/authorizedHttp"
import { CreateInstantMeetingRequestDTO, CreateInstantMeetingResponseDTO, JoinSessionRequestDTO, JoinSessionResponseDTO } from '../types'

class SharedSessionService {
  createInstantMeeting = async (
    request: CreateInstantMeetingRequestDTO
  ): Promise<CreateInstantMeetingResponseDTO> => {
    return authorizedHttpServer
      .post('/session/create/instant/', request)
      .then((response) => {
        return response.data as CreateInstantMeetingResponseDTO
      })
  }

  joinSession = async (
    request: JoinSessionRequestDTO
  ): Promise<JoinSessionResponseDTO> => {
    return authorizedHttpServer
      .post('/session/join/', request)
      .then((response) => {
        return response.data as JoinSessionResponseDTO
      })
  }
}

const sharedSessionService = new SharedSessionService()

export default sharedSessionService
