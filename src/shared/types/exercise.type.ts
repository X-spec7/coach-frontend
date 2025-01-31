export interface IExercise {
  title: string
  description: string
  exerciseIconUrl: string
  exerciseGifUrl: string
  calorie: string
}

export interface IClassExercise extends IExercise {
  classWorkoutDailyPlanId: number
}
