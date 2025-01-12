import { Trainer } from "@/shared/types"

export interface GetTrainersPayloadDTO {
  pageSize: number
  pageNum: number
  query?: string
  expertise?: string
}

export interface GetTrainersResponseDTO {
  trainers: Trainer[]
  total: number
  pageNum: number
  pageSize: number
}

export interface GetTotalTrainersCountPayloadDTO {
  query?: string
  expertise?: string
}

export interface GetTotalTrainersCountResponseDTO {
  totalCount: number
}

export interface GetTrainerByIdPayloadDTO {
  trainerId: string
}

export interface GetTrainerByIdResponseDTO {
  trainer: Trainer
}
