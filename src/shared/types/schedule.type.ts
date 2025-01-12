export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export interface Schedule {
  title: string
  description: string
  tutorName: string
  time: string
  day: DayOfWeek
  completed: boolean
}
