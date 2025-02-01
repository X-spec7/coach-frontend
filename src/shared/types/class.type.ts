import { IClassExercise } from "./exercise.type"

export interface IClass {
  id: number
  coachId: number
  coachFullname: string
  title: string
  description: string
  classBannerImageUrl: string
  category: string
  intensity: string
  level: string
  price: number
  sessionCount: number
  durationPerSession: number
  caloriePerSession: number
  benefits?: string[]
  equipments?: string[]
  exercises?: IClassExercise[]
}
