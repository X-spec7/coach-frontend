import { BaseRestApiResponseType } from '@/shared/types'
import { IContactUser, ISearchedUser } from './contact'
import { IMessage } from './message'

export interface GetMessagesByUserIdResponseDTO extends BaseRestApiResponseType {
  data: {
    otherPersonFullname: string
    otherPersonAvatarUrl: string
    totalMessageCount: number
    messages: IMessage[]
    hasUnreadMessages: boolean
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

export interface GetContactsResponseDTO extends BaseRestApiResponseType {
  contacts: IContactUser[]
}

export interface SearchUserResponseDTO extends BaseRestApiResponseType {
  users: ISearchedUser[]
  totalUsersCount: number
}

// web socket

export interface SendMessageRequestDTO {
  recipientId: string
  message: string
}

export interface CreateMeetingResponseDTO extends BaseRestApiResponseType {
  joinUrl: string
  startUrl: string
}

export interface MarkMessagesAsReadRequestDTO {
  otherPersonId: number
}

export interface MarkMessagesAsReadResponseDTO extends BaseRestApiResponseType {
  updatedCount: number
}
