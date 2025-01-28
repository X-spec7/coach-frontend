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

export type IUserRoleGuard = 'Client' | 'Coach' | 'Admin'
