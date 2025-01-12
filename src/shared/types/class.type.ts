type SessionRange = {
  minimumDuration: number
  maximumDuration: number
}

export type ClassLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'

export type ClassCategory = 'Strength' | 'Cardio' | 'Core' | 'Flexibility' | 'Strength Training' | 'Cardio Workouts' | 'Mind & Body'

export interface Class{
  category: string
  title: string
  tutor: string
  videoNumber?: number
  sessionRange?: SessionRange
  level?: ClassLevel
  durationPerSession?: number
  price?: number
}
