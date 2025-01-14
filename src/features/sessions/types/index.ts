export interface ISession {
  id: number
  // basic info
  title: string
  startDate: string
  duration: number // in minutes
  // coach info
  coachId: number
  coachFullname: string
  // session desc
  goal: string
  level: string
  description: string
  bannerImageUrl?: string
  // booking info
  totalParticipantNumber: number
  currentParticipantNumber: number
  price: number
  // equip
  equipments?: string[]
  // corresponding scheduled meeting
  meetingId: string
}

export interface ISessionWithBookedStatus extends ISession {
  booked: boolean
}

export type {
  CreateSessionRequestDTO,
  GetMySessionsResponseDTO,
  GetSessionsRequestDTO,
  GetTotalSessionCountRequestDTO,
  GetTotalSessionCountResponseDTO,
  GetSessionsResponseDTO,
  GetSessionByIdRequestDTO,
  GetSessionByIdResponseDTO,
} from './dto'
