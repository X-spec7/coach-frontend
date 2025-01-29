import { IClass } from './class.type'
import { IContact } from './common.type'

export interface ICertification {
  certificationTitle: string
  certificationDetail: string
}

export interface IReview {
  name: string
  avatarUrl: string
  rating: number
  review: string
}

export interface Trainer {
  id: string
  name: string
  avatarUrl?: string
  bannerUrl?: string
  experience?: number
  members?: number
  rating?: number
  classes?: IClass[]
  contact?: IContact
  certification?: ICertification[]
  expertise?: string
  reviews?: IReview[]
}
