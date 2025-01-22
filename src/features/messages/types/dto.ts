import { IContactUser, ISearchedUser } from './contact'
import { IMessage } from './message'

export interface GetMessagesByUserIdResponseDTO {
  message: string
  data: {
    otherPersonFullname: string
    otherPersonAvatarUrl: string
    totalMessageCount: number
    messages: IMessage[]
  }
}

export interface GetMessagesByUserIdRequestDTO {
  otherPersonId: number
  offset: number
  limit: number
}

export interface SearchUserRequestDTO {
  offset: number
  limit: number
  query?: string
}

export interface GetContactsResponseDTO {
  message: string
  contacts: IContactUser[]
}

export interface SearchUserResponseDTO {
  message: string
  users: ISearchedUser[]
  totalUsersCount: number
}

// web socket

export interface SendMessageRequestDTO {
  recipientId: string
  message: string
}

export interface CreateMeetingResponseDTO {
  message: string
  joinUrl: string
  startUrl: string
  status: number
}
