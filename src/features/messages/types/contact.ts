import { IMessage } from './message'

export interface IContactUser {
  id: string
  fullName: string
  avatarUrl: string
  userType: string
  unreadCount: number
  lastMessage?: IMessage
}
