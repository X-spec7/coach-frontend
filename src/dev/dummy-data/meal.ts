import { Meal } from '@/shared/types'

export const mealDummyData: Meal[] = [
  {
    mealTime: 'Breakfast',
    mealTitle: 'Power Protein',
    difficulty: 'Medium',
    calory: 1800,
    description: 'Scrambled Eggs with Turkey Bacon and Sautéed Spinach',
    healthScore: 85,
    nutrition: {
      carb: 40,
      protein: 35,
      fat: 15,
    }
  },
  {
    mealTime: 'Lunch',
    mealTitle: 'Vegan Energy Boost',
    difficulty: 'Medium',
    calory: 1600,
    description: 'Chickpea and Avocado Salad with Lemon Tahini Dressing',
    healthScore: 90,
    nutrition: {
      carb: 10,
      protein: 25,
      fat: 20,
    }
  },
  {
    mealTime: 'Dinner',
    mealTitle: 'Lean & Green',
    difficulty: 'Easy',
    calory: 1500,
    description: 'Baked Salmon with Steamed Broccoli and Brown Rice',
    healthScore: 80,
    nutrition: {
      carb: 45,
      protein: 15,
      fat: 18,
    }
  }
]
