import { CreateMeetingResponseDTO } from '../types/dto'
import axios, { AxiosInstance } from 'axios'

class MeetingService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    this.httpClient = httpClient || axios.create({baseURL: 'api/chat/meeting'})
  }

  createMeeting = async (): Promise<CreateMeetingResponseDTO> => {
    return this.httpClient
      .post('/create')
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }
}

const meetingService = new MeetingService()

export default meetingService
