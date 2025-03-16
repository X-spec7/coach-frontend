import { GetMessagesByUserIdRequestDTO, GetMessagesByUserIdResponseDTO } from '../types'
import { MarkMessagesAsReadRequestDTO, MarkMessagesAsReadResponseDTO } from '../types/dto'
import axios, { AxiosInstance } from 'axios'

class MessageService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    this.httpClient = httpClient || axios.create({ baseURL: 'api/chat/message'})
  }
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

    return this.httpClient
      .get(`/${otherPersonId}/?${params.toString()}`)
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
    return this.httpClient
      .post(`/read/${otherPersonId}/`)
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
