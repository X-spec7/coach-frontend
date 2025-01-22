import { Class } from './class.type'
import { IContact } from './common.type'

export interface ICertification {
  title: string
  year: number
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
  classes?: Class[]
  contact?: IContact
  certification?: ICertification[]
  expertise?: string
  reviews?: IReview[]
}
