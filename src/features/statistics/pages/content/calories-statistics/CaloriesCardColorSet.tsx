import { ColorSet } from '@/features/statistics/types'

export class CaloriesCardColorSet {
  static calories: ColorSet = {
    bgColor: 'bg-gray-bg',
    progressBgColor: 'bg-white',
    progressColor: 'bg-gray-10',
  }

  static protein: ColorSet = {
    bgColor: 'bg-blue',
    progressBgColor: 'bg-blue-subtle',
    progressColor: 'bg-blue-dark',
  }

  static carbs: ColorSet = {
    bgColor: 'bg-yellow',
    progressBgColor: 'bg-yellow-subtle',
    progressColor: 'bg-yellow-dark',
  }

  static fats: ColorSet = {
    bgColor: 'bg-green',
    progressBgColor: 'bg-green-subtle',
    progressColor: 'bg-green-dark',
  }
}
