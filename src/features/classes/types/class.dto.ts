import {
  BaseRestApiResponseType,
  IClass,
  IClassExercise,
  IClassSession
} from '@/shared/types'

export interface GetClassesRequestDTO {
  limit: number
  offset: number
  query?: string
  category?: string
  level?: string
}

export interface GetClassesResposneDTO extends BaseRestApiResponseType {
  classes: IClass[]
  totalClassesCount: number
}

export interface GetClassByIdRequestDTO {
  classId: number
}

export interface GetClassByIdResponseDTO extends BaseRestApiResponseType {
  class: IClass
}

export interface CreateClassRequestDTO {
  title: string
  category: string
  description: string
  intensity: string
  level: string
  price: number
  sessionCount: number
  durationPerSession: number
  caloriePerSession: number
  benefits: string[]
  equipments: string[]
  bannerImage: any

  exercises: IClassExercise[]
  sessions: IClassSession[]
}

export interface CreateClassResponseDTO extends BaseRestApiResponseType {}

export interface BookClassRequestDTO {
  classId: number
}

export interface BookClassResponseDTO extends BaseRestApiResponseType {
  class: IClass
}

export interface JoinClassSessionRequestDTO {
  classSessionId: number
}

export interface JoinClassSessionResponseDTO extends BaseRestApiResponseType {
  joinUrl: string
}

export interface StartClassSessionRequestDTO {
  classSessionId: number
}

export interface StartClassSessionResponseDTO extends BaseRestApiResponseType {
  startUrl: string
}
