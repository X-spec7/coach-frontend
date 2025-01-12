export type MealTime = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'All'
export type MealDifficulty = 'Easy' | 'Medium' | 'Hard'
export interface Nutrition {
  carb: number
  protein: number
  fat: number
}

export interface Meal {
  mealTime: MealTime
  mealTitle: string
  difficulty: MealDifficulty
  calory: number
  description: string
  healthScore: number
  nutrition: Nutrition
}
