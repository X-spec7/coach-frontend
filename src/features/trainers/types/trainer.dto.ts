import { Trainer } from '@/shared/types'
import { ITrainerCard } from '.'
import { BaseRestApiResponseType } from '@/shared/types'

export interface GetTrainersPayloadDTO {
  offset: number
  limit: number
  query?: string
  specialization?: string
}

export interface GetTrainersResponseDTO extends BaseRestApiResponseType {
  trainers: ITrainerCard[]
  totalTrainerCount: number
}

export interface GetTotalTrainersCountPayloadDTO {
  query?: string
  expertise?: string
}

export interface GetTotalTrainersCountResponseDTO extends BaseRestApiResponseType {
  totalCount: number
}

export interface GetTrainerByIdPayloadDTO {
  trainerId: string
}

export interface GetTrainerByIdResponseDTO extends BaseRestApiResponseType {
  trainer: Trainer
}
