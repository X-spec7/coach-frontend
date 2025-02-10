import { IClassExercise } from "./exercise.type"
import { IClassSession } from "./session.type"

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
  sessions?: IClassSession[]
  booked?: boolean
}
