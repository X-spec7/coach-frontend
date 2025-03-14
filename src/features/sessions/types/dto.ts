import { BaseRestApiResponseType, ISession } from '@/shared/types'
import { ISessionWithBookedStatus } from '.'

// Coach
export interface CreateSessionRequestDTO {
  title: string
  startDate: string
  duration: number
  goal: string
  level: string
  description: string
  bannerImage: any
  totalParticipantNumber: number
  price: number
  equipments: string[]
}

export interface CreateSessionResponseDTO extends BaseRestApiResponseType {
  sessionId: number
  meetingId: number
}

export interface GetMySessionsRequestDTO {
  limit: number
  offset: number
  query?: string
}

export interface GetMySessionsResponseDTO extends BaseRestApiResponseType {
  sessions: ISession[]
  totalSessionCount: number
}

export interface GetTotalMySessionCountRequestDTO {
  query?: string
}

export interface GetTotalMySessionCountResponseDTO extends BaseRestApiResponseType {
  totalSessionCount: number
}

// Client
export interface GetSessionsRequestDTO {
  limit: number
  offset: number
  goal?: string
  booked?: boolean
  query?: string
}

export interface GetSessionsResponseDTO extends BaseRestApiResponseType {
  sessions: ISessionWithBookedStatus[]
  totalSessionCount: number
}

export interface GetTotalSessionCountRequestDTO extends Omit<GetSessionsRequestDTO, 'offset' | 'limit'> {}

export interface GetTotalSessionCountResponseDTO extends GetTotalMySessionCountResponseDTO {}

export interface GetSessionByIdRequestDTO {
  sessionID: string
}

export interface GetSessionByIdResponseDTO extends BaseRestApiResponseType {
  session: ISessionWithBookedStatus
}

// Should be updated
export interface BookSessionRequestDTO {
  sessionId: string
}

export interface BookSessionResponseDTO extends BaseRestApiResponseType {}

export interface JoinSessionRequestDTO {
  sessionId: string
}

export interface JoinSessionResponseDTO extends BaseRestApiResponseType {
  zoom_url: string
}

// Shared

export interface CreateInstantMeetingRequestDTO {
  otherPersonId: string
}

export interface CreateInstantMeetingResponseDTO extends BaseRestApiResponseType {
  message: string
  join_url: string
  start_url: string
}
