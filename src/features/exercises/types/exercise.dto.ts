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
