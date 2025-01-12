export type { LoginPayloadDTO, RegisterPayloadDTO, User } from './auth.type'
export type { ProfilePayloadDTO, ProfilePayloadType } from './profile.type'

export interface UserResponseDTO {
  id: number
  first_name: string
  last_name: string
  user_type: string
  email: string
  banner_image_url?: string
  phone_number?: string
  avatar_image_url?: string
  specialization?: string
  years_of_experience?: number
}