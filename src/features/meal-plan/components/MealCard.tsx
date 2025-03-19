"use client"

import type React from "react"
import Image from "next/image"
import { AddButton } from "@/shared/components"
import { ChartBarSvg, ClockSvg } from "@/shared/components/Svg"
import type { Meal } from "../types/class.dto"
import HealthScoreBar from "./HealthScoreBar"
import NutritionInfo from "./NutritionInfo"
import { getBgColorClass } from "../hooks/getBgColorClass"
import { useRouter } from "next/navigation"

interface MealCardProps {
    meal: Meal
    onAddMeal: (meal: Meal) => void
}


const MealCard: React.FC<MealCardProps> = ({ meal, onAddMeal }) => {
    const router = useRouter()
    const handleMealClick = () => {
        router.push(`/meal-plan/${meal.id}`)
    }
    return (
        <div className="w-full border border-gray-bg rounded-4xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow" onClick={handleMealClick}>
            <div className="flex items-center gap-4 w-full">
                <Image
                    src="/images/meal/lean_green.png"
                    alt={meal.mealTitle}
                    width={150}
                    height={150}
                    className="rounded-4xl"
                />
                <div className="flex flex-col gap-4 ml-4 w-full">
                    <div className="flex gap-2 justify-between items-center w-full">
                        <span className={`text-gray-30 ${getBgColorClass(meal.mealTime)} px-4 py-1 rounded-4xl`}>{meal.mealTime}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-20 bg-gray-bg px-4 py-1 rounded-4xl flex items-center gap-1">
                                <ChartBarSvg height="20" width="20" color="#878a94" />
                                {meal.difficulty}
                            </span>
                            {meal.duration && (
                                <span className="text-gray-20 bg-gray-bg px-4 py-1 rounded-4xl flex items-center gap-1">
                                    <ClockSvg height="20" width="20" color="#878a94" />
                                    {meal.duration}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-black text-lg">{meal.mealTitle}</h2>
                        <p className="text-gray-20 text-sm">{meal.description}</p>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <HealthScoreBar score={meal.healthScore} />
                        <AddButton title="Add" onClick={() => onAddMeal(meal)} />
                    </div>
                </div>
            </div>
            <NutritionInfo calories={meal.calory} nutrition={meal.nutrition} />
        </div>
    )
}

export default MealCard

