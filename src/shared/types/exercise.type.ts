export interface IExercise {
  id: number
  title: string
  description: string
  exerciseIconUrl: string
  exerciseGifUrl: string
  caloriePerRound: number
}

export interface IFormExercise {
  title: string
  description: string
  exerciseIcon: any
  exerciseGif: any
  caloriePerRound: number
}

export interface IClassExercise extends IExercise {
  setCount: number
  repsCount: number
  restDuration: number
  caloriePerSet: number
}
