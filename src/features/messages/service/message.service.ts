import { GetMessagesByUserIdRequestDTO, GetMessagesByUserIdResponseDTO } from '../types'
import authorizedHttpClient from '@/shared/services/authorizedHttp'
import { MarkMessagesAsReadRequestDTO, MarkMessagesAsReadResponseDTO } from '../types/dto'

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

    return authorizedHttpClient
      .get(`/chat/messages/${otherPersonId}/?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  async markMessagesAsRead(
    {
      otherPersonId
    }: MarkMessagesAsReadRequestDTO
  ): Promise<MarkMessagesAsReadResponseDTO> {
    return authorizedHttpClient
      .post(`/chat/messages/read/${otherPersonId}/`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }
}

const messageService = new MessageService()

export default messageService
