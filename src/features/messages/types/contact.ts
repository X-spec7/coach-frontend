import { IMessage } from './message'

export interface IContactUser {
  id: number
  fullName: string
  avatarUrl: string
  userType: string
  unreadCount: number
  lastMessage?: IMessage
}

export interface ISearchedUser {
  id: number
  fullName: string
  avatarUrl: string
  userType: string
}
