import { IUser } from '@/shared/types'

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

export interface GetProfileResponseDTO {
  message: string
  user: IUser
  status: number
}

export interface UpdateProfileResponseDTO extends GetProfileResponseDTO {}
