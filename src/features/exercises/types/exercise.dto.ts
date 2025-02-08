import { BaseRestApiResponseType, IExercise } from "@/shared/types"

export interface CreateExerciseRequestDTO {
  title: string
  description: string
  caloriePerRound: number
  exerciseIcon: any
  exerciseGif: any
}

export interface CreateExerciseResponseDTO extends BaseRestApiResponseType {
  exercise: IExercise
}

export interface EditExerciseRequestDTO extends CreateExerciseRequestDTO {
  exerciseId: number
}

export interface EditExerciseResponseDTO extends BaseRestApiResponseType {}

export interface GetExercisesRequestDTO {
  limit: number
  offset: number
  query?: string
}

export interface GetExercisesResponseDTO extends BaseRestApiResponseType {
  exercises: IExercise[]
  totalExercisesCount: number
}
