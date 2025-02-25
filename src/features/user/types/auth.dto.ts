import { BaseRestApiResponseType, IUser } from '@/shared/types'

export interface LoginPayloadDTO {
  email: string
  password: string
}

export interface LoginResponseDTO extends BaseRestApiResponseType {
  token: string
  user: IUser
}

export interface RegisterPayloadDTO {
  email: string
  firstName: string
  lastName: string
  password: string
  userType: string
}

export interface RegisterResponseDTO extends BaseRestApiResponseType {}
