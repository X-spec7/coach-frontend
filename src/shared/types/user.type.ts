export interface IUser {
  id: number
  firstName: string
  lastName: string
  userType: string
  email: string
  isSuperuser: boolean
  phoneNumber?: string
  avatarImageUrl?: string
  bannerImageUrl?: string
  yearsOfExperience?: number
  specialization?: string
}

export type IUserRoleGuard = 'Client' | 'Coach' | 'Admin'
