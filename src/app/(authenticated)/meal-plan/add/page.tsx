import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import MealPlanPage from "@/features/meal-plan/pages"

export const metadata: Metadata = {
    title: "Add Meal Plan | COA-CH",
    description: "Create a new meal plan for yourself or your clients",
}

const AddMealPlan: React.FC = () => {
    return (
        <SharedLayout headerTitle="Add Meal Plan" headerDescription="Create a personalized meal plan">
            <MealPlanPage />
        </SharedLayout>
    )
}

export default AddMealPlan

