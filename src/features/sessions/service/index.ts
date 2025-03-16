export { default as clientSessionService } from './client.service'
export { default as coachSessionService } from './coach.service'

import {
  CreateInstantMeetingRequestDTO,
  CreateInstantMeetingResponseDTO,
  JoinSessionRequestDTO,
  JoinSessionResponseDTO
} from '../types'
import axios, { AxiosInstance } from 'axios'

class SharedSessionService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    this.httpClient = httpClient || axios.create({ baseURL: 'api/sessions/shared'})
  }
  createInstantMeeting = async (
    payload: CreateInstantMeetingRequestDTO
  ): Promise<CreateInstantMeetingResponseDTO> => {
    return this.httpClient
      .post('/create-meeting', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  joinSession = async (
    payload: JoinSessionRequestDTO
  ): Promise<JoinSessionResponseDTO> => {
    return this.httpClient
      .post('/join-session', payload)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }
}

const sharedSessionService = new SharedSessionService()

export default sharedSessionService
