"use client"

import { useAuth } from "@/shared/provider"
import CoachMealPlanPage from "./coach"
import ClientMealPlanPage from "./client"

const MealPlanPage = () => {
    const { user } = useAuth()

    if (user?.userType === "Coach") {
        return <CoachMealPlanPage />
    }

    return <ClientMealPlanPage />
}

export default MealPlanPage

