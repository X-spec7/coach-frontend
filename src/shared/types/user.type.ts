import { ICertification } from "./trainer.type"

export interface IUser {
  id: number
  firstName: string
  lastName: string
  userType: string
  email: string
  address: string
  isSuperuser: boolean
  phoneNumber?: string
  avatarImageUrl?: string
}

export interface ICoachProfile extends IUser {
  yearsOfExperience?: number
  specialization?: string
  bannerImageUrl?: string
  certifications?: ICertification[]
}

export type IUserRoleGuard = 'Client' | 'Coach' | 'Admin'
