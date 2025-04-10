export type MealTime = "Breakfast" | "Lunch" | "Dinner" | "Snack" | "All";
export type MealDifficulty = "Easy" | "Medium" | "Hard";
export interface Nutrition {
  carb: number;
  protein: number;
  fat: number;
}

export interface NutritionFacts {
  calories: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  vitaminA: number;
  vitaminC: number;
  calcium: number;
  iron: number;
}

export interface MealIngredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface MealStep {
  id: number;
  title: string;
  description: string;
}

export interface MealTool {
  name: string;
}

export interface MealReview {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Meal {
  id: number;
  mealTime: string;
  mealTitle: string;
  difficulty: string;
  calory: number;
  description: string;
  healthScore: number;
  nutrition: Nutrition;
  duration?: string;
  rating?: number;
  eatingTime?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients?: MealIngredient[];
  steps?: MealStep[];
  tools?: MealTool[];
  notes?: string[];
  nutritionFacts?: NutritionFacts;
  reviews?: MealReview[];
  image?: string;
}
