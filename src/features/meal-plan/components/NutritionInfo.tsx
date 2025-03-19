import type React from "react"
import { FireSvg } from "@/shared/components/Svg"
import type { Nutrition } from "../types/class.dto"

interface NutritionInfoProps {
    calories: number
    nutrition: Nutrition
}

const NutritionInfo: React.FC<NutritionInfoProps> = ({ calories, nutrition }) => {
    return (
        <div className="px-5 py-5 bg-gray-bg-subtle rounded-2xl flex flex-col h-full justify-between max-w-40 w-full">
            <div className="flex items-center gap-1">
                <FireSvg height="20" width="20" color="#000" />
                <p className="text-gray-30 text-sm font-normal w-full"> {calories} Cal </p>
            </div>
            <div className="flex items-center gap-1">
                <FireSvg height="20" width="20" color="#000" />
                <p className="text-gray-30 text-sm font-normal w-full"> {nutrition.carb}g Carbs </p>
            </div>
            <div className="flex items-center gap-1">
                <FireSvg height="20" width="20" color="#000" />
                <p className="text-gray-30 text-sm font-normal w-full"> {nutrition.protein}g Protein </p>
            </div>
            <div className="flex items-center gap-1">
                <FireSvg height="20" width="20" color="#000" />
                <p className="text-gray-30 text-sm font-normal w-full"> {nutrition.fat}g Fats </p>
            </div>
        </div>
    )
}

export default NutritionInfo

