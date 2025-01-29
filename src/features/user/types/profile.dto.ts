import { IUser } from '@/shared/types'
import { BaseRestApiResponseType } from '@/shared/types'

export interface UpdateClientProfilePayloadDTO {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  avatar: any
}

export interface UpdateClientProfileResponseDTO extends GetProfileResponseDTO {}

export interface UpdateCoachProfilePayloadDTO {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  yearsOfExperience: number
  specialization: string
  avatar: any
  banner: any
}

export interface GetProfileResponseDTO extends BaseRestApiResponseType {
  user: IUser
}

export interface UpdateCoachProfileResponseDTO extends GetProfileResponseDTO {}
