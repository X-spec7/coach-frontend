import { ICertification } from "./trainer.type"

export interface IUser {
  id: number
  firstName: string
  lastName: string
  fullName: string
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

export interface ICoachDetailClass {
  title: string
  category: string
}

export interface ICoachReview {
  coachId: number
  reviewerName: string
  reviewerAvatarUrl: string
  rating: number
  content: string
}

export interface ICoachDetail extends ICoachProfile {
  members?: number
  classes: ICoachDetailClass[]
  reviews?: ICoachReview[]
}

export type IUserRoleGuard = 'Client' | 'Coach' | 'Admin'
