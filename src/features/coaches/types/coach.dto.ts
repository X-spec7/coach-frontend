import { ICoachDetail } from '@/shared/types'
import { ICoachCard } from '.'
import { BaseRestApiResponseType } from '@/shared/types'
export interface GetCoachesPayloadDTO {
  offset: number
  limit: number
  query?: string
  specialization?: string
  listed?: string
}

export interface GetCoachesResponseDTO extends BaseRestApiResponseType {
  coaches: ICoachCard[]
  totalCoachesCount: number
}

export interface GetTotalCoachesCountPayloadDTO {
  query?: string
  specialization?: string
  listed?: string
}

export interface GetTotalCoachesCountResponseDTO extends BaseRestApiResponseType {
  totalCount: number
}

export interface GetCoachByIdPayloadDTO {
  coachId: number
}

export interface GetCoachByIdResponseDTO extends BaseRestApiResponseType {
  coach: ICoachDetail
}

export interface ToggleCoachListedStatePayloadDTO {
  coachId: number
}

export interface ToggleCoachListedStateResponseDTO extends BaseRestApiResponseType {
  coach: ICoachCard
}
