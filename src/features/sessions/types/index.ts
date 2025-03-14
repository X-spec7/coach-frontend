import { ISession } from '@/shared/types'

export interface ISessionWithBookedStatus extends ISession {
  booked: boolean
}

export type {
  // coach
  CreateSessionRequestDTO,
  CreateSessionResponseDTO,
  GetMySessionsRequestDTO,
  GetMySessionsResponseDTO,
  GetTotalMySessionCountRequestDTO,
  GetTotalMySessionCountResponseDTO,
  // client
  GetSessionsRequestDTO,
  GetTotalSessionCountRequestDTO,
  GetTotalSessionCountResponseDTO,
  GetSessionsResponseDTO,
  GetSessionByIdRequestDTO,
  GetSessionByIdResponseDTO,
  BookSessionRequestDTO,
  BookSessionResponseDTO,
  // shared
  CreateInstantMeetingRequestDTO,
  CreateInstantMeetingResponseDTO,
  JoinSessionRequestDTO,
  JoinSessionResponseDTO,
} from './dto'
