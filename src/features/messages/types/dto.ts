import { IMessage } from './message'

export interface GetMessagesByUserIdResponseDTO {
  userId: string
  otherPersonId: string
  otherPersonFullname: string
  otherPersonAvatarUrl: string
  totalMessageCount: number
  messages: IMessage[]
}

export interface GetMessagesByUserIdRequestDTO {
  otherPersonId: string
  offset: number
  limit: number
}
