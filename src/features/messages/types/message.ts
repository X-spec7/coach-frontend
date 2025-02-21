export interface IMessage {
  id: number
  senderId: number
  content: string
  isRead: boolean
  isSent: boolean
  sentDate: string
}
