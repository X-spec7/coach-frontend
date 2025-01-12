import { getMessagesByUserId } from '@/dev/api'
import { GetMessagesByUserIdRequestDTO, GetMessagesByUserIdResponseDTO } from '../types'

class MessageService {
  async getMessagesByUserId(
    {
      otherPersonId,
      offset = 0,
      limit = 10,
    }: GetMessagesByUserIdRequestDTO
  ): Promise<GetMessagesByUserIdResponseDTO> {
    const response = await getMessagesByUserId({otherPersonId, offset, limit})
    return response
  }
}

const messageService = new MessageService()

export default messageService
