import { GetMessagesByUserIdRequestDTO, GetMessagesByUserIdResponseDTO } from '../types'
import authorizedHttpServer from '@/shared/services/authorizedHttp'

class MessageService {
  async getMessagesByUserId(
    {
      otherPersonId,
      offset = 0,
      limit = 25,
    }: GetMessagesByUserIdRequestDTO
  ): Promise<GetMessagesByUserIdResponseDTO> {
    const params = new URLSearchParams()
    if (limit) {
      params.append('limit', limit.toString())
    }
    if (offset) {
      params.append('offset', offset.toString())
    }

    return authorizedHttpServer
      .get(`/chat/messages/${otherPersonId}/?${params.toString()}`)
      .then((response) => {
        return response.data as GetMessagesByUserIdResponseDTO
      })
  }
}

const messageService = new MessageService()

export default messageService
