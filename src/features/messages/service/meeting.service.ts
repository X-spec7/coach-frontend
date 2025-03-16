import { authorizedHttpClient } from '@/shared/services'
import { CreateMeetingResponseDTO } from '../types/dto'

class MeetingService {
  createMeeting = async (): Promise<CreateMeetingResponseDTO> => {
    return authorizedHttpClient
      .post('/session/create/instant/')
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
