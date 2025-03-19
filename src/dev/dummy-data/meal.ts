import { Meal } from "@/shared/types";

export const mealDummyData: Meal[] = [
  {
    id: 1,
    mealTime: "Breakfast",
    mealTitle: "Scrambled Eggs with Turkey Bacon and Sautéed Spinach",
    difficulty: "Easy",
    calory: 360,
    description:
      "A protein-rich breakfast combining high-quality protein and healthy fats. The eggs are scrambled to provide essential amino acids, while the turkey bacon adds a lean source of protein. Sautéed spinach contributes vitamins and minerals, making this dish both satisfying and nutritious.",
    healthScore: 85,
    nutrition: {
      carb: 10,
      protein: 35,
      fat: 15,
    },
    eatingTime: "8:00 AM",
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    ingredients: [
      { name: "Large eggs", amount: "3" },
      { name: "Turkey bacon", amount: "2", unit: "slices" },
      { name: "Fresh spinach", amount: "1", unit: "cup" },
      { name: "Olive oil", amount: "1", unit: "tablespoon" },
      { name: "Salt and pepper", amount: "", unit: "to taste" },
    ],
    steps: [
      {
        id: 1,
        title: "Prep the Ingredients",
        description:
          "Crack the eggs into a mixing bowl, add a pinch of salt and pepper, and whisk until fully blended.",
      },
      {
        id: 2,
        title: "Cook the Turkey Bacon",
        description:
          "Heat the skillet over medium heat and cook the turkey bacon until crispy, about 3-4 minutes on each side. Remove and set aside.",
      },
      {
        id: 3,
        title: "Sauté the Spinach",
        description:
          "In the same skillet, add olive oil and spinach. Sauté until the spinach is wilted, about 2-3 minutes. Remove and set aside.",
      },
      {
        id: 4,
        title: "Cook the Eggs",
        description:
          "Pour the egg mixture into the skillet and cook, stirring gently with a spatula, until the eggs are fully cooked but still soft, about 2-3 minutes.",
      },
      {
        id: 5,
        title: "Assemble and Serve",
        description:
          "Plate the scrambled eggs with turkey bacon and sautéed spinach. Serve immediately.",
      },
    ],
    tools: [
      { name: "Non-stick skillet" },
      { name: "Spatula" },
      { name: "Mixing bowl" },
      { name: "Fork" },
      { name: "Measuring spoons" },
    ],
    notes: [
      "For a lower-calorie option, substitute olive oil with a cooking spray or reduce the amount of turkey bacon.",
      "Add a sprinkle of cheese or herbs like chives or parsley for extra flavor.",
    ],
    nutritionFacts: {
      calories: 360,
      totalCarbohydrates: 10,
      dietaryFiber: 3,
      sugars: 1,
      protein: 29,
      totalFat: 20,
      saturatedFat: 5,
      transFat: 0,
      cholesterol: 0,
      sodium: 730,
      potassium: 600,
      vitaminA: 100,
      vitaminC: 20,
      calcium: 8,
      iron: 15,
    },
    reviews: [
      {
        id: 1,
        userName: "Samantha Lee",
        userImage: "/images/user/user-01.png",
        rating: 5,
        comment:
          "My go-to breakfast is quick, filling, and nutritious! I sometimes add a dash of sriracha, and it's easy to add other veggies or spices!",
        date: "2025-03-15",
      },
      {
        id: 2,
        userName: "David Chen",
        userImage: "/images/user/user-02.png",
        rating: 4,
        comment:
          "Delicious and healthy. I sometimes add avocado for healthy fats/omega. The turkey bacon is a nice, less alternative to regular bacon.",
        date: "2025-03-10",
      },
      {
        id: 3,
        userName: "Jessica Moore",
        userImage: "/images/user/user-03.png",
        rating: 5,
        comment:
          "Perfect way to start the day! The eggs are fluffy, the spinach is tender, turkey bacon is both tasty and nutritious. Highly recommended!",
        date: "2025-03-05",
      },
    ],
    image: "/images/meal/pasta.png",
  },
  {
    id: 2,
    mealTime: "Lunch",
    mealTitle: "Vegan Energy Boost",
    difficulty: "Medium",
    calory: 1600,
    description: "Chickpea and Avocado Salad with Lemon Tahini Dressing",
    healthScore: 90,
    nutrition: {
      carb: 10,
      protein: 25,
      fat: 20,
    },
  },
  {
    id: 3,
    mealTime: "Dinner",
    mealTitle: "Lean & Green",
    difficulty: "Easy",
    calory: 1500,
    description: "Baked Salmon with Steamed Broccoli and Brown Rice",
    healthScore: 80,
    nutrition: {
      carb: 45,
      protein: 15,
      fat: 18,
    },
  },
];
