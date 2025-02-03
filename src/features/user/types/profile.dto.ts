import { ICoachProfile, IUser } from '@/shared/types'
import { BaseRestApiResponseType } from '@/shared/types'
import { ICertification } from '@/shared/types/trainer.type'

export interface UpdateClientProfilePayloadDTO {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  avatar: any
}

export interface UpdateClientProfileResponseDTO extends BaseRestApiResponseType {
  user: IUser
}

export interface UpdateCoachProfilePayloadDTO {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  yearsOfExperience: number
  specialization: string
  certifications: ICertification[]
  avatar: any
  banner: any
}

export interface GetProfileResponseDTO extends BaseRestApiResponseType {
  user: IUser
}

export interface UpdateCoachProfileResponseDTO extends BaseRestApiResponseType {
  user: ICoachProfile
}
