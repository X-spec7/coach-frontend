import { IUser } from '@/shared/types'

export interface LoginPayloadDTO {
  email: string
  password: string
}

export interface LoginResponseDTO {
  message: string
  user: IUser
  status: number
}

export interface RegisterPayloadDTO {
  email: string
  firstName: string
  lastName: string
  password: string
  userType: string
}

export interface RegisterResponseDTO {
  message: string
  status: number
}
