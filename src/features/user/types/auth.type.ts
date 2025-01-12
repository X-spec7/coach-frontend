export interface LoginPayloadDTO {
  email: string
  password: string
}

export interface LoginResponseDTO {
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

export interface RegisterPayloadDTO {
  email: string
  first_name: string
  last_name: string
  password: string
  user_type: string
}

export interface User {
  id?: number
  firstName: string
  lastName: string
  userType: string
  email: string
  phoneNumber?: string
  profilePicture?: string
  bannerImage?: string
  yearsOfExperience?: number
  specialization?: string
  // Add more
}
