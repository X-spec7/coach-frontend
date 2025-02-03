import { BaseRestApiResponseType, IClass } from '@/shared/types'

export interface GetClassesRequestDTO {
  limit: number
  offset: number
  query: string
  category: string
  level: string
}

export interface GetClassesResposneDTO extends BaseRestApiResponseType {
  classes: IClass[]
  totalClassesCount: number
}
