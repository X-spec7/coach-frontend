import { ISessionWithBookedStatus, ISession } from '.'

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

export interface GetMySessionsRequestDTO {
  limit: number
  offset: number
  query?: string
}

export interface GetMySessionsResponseDTO {
  message: string
  sessions: ISession[]
  totalCount: number
}

export interface GetTotalMySessionCountRequestDTO {
  query?: string
}

export interface GetTotalMySessionCountResponseDTO {
  totalSessionCount: number
  message: string
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

export interface GetTotalSessionCountRequestDTO extends Omit<GetSessionsRequestDTO, 'offset' | 'limit'> {}

export interface GetTotalSessionCountResponseDTO extends GetTotalMySessionCountResponseDTO {}

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
