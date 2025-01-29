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

export interface UpdateProfilePayloadDTO {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  yearsOfExperience: number
  specialization: string
  avatarImage: any
  bannerImage: any
}

export interface GetProfileResponseDTO extends BaseRestApiResponseType {
  user: IUser
}

export interface UpdateProfileResponseDTO extends GetProfileResponseDTO {}
