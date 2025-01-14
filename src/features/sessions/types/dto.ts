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
  equipments: string[]
}

export interface GetMySessionsResponseDTO {
  message: string
  sessions: ISessionWithBookedStatus[]
  totalCount: number
}

// Client
export interface GetSessionsRequestDTO {
  limit: number
  offset: number
  goal?: string
  booked?: boolean
  query?: string
}

export interface GetSessionsResponseDTO {
  message: string
  sessions: ISessionWithBookedStatus[]
}

export interface GetTotalSessionCountRequestDTO extends GetSessionsRequestDTO {}

export interface GetTotalSessionCountResponseDTO {
  totalSessionCount: number
  message: string
}

export interface GetSessionByIdRequestDTO {
  sessionID: string
}

export interface GetSessionByIdResponseDTO {
  message: string
  session: ISessionWithBookedStatus
}

// Should be updated
export interface BookSessionRequestDTO {
  sessionId: string
}
