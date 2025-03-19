import type React from "react"
import Image from "next/image"
import { ChartBarSvg } from "@/shared/components/Svg"
import { getBgColorClass } from "../hooks/getBgColorClass"

interface RecommendedMealCardProps {
    title: string
    mealTime: string
    difficulty: string
    imageSrc: string
    nutrition: {
        calories: number
        carbs: number
        protein: number
        fat: number
    }
}

const RecommendedMealCard: React.FC<RecommendedMealCardProps> = ({ title, mealTime, difficulty, imageSrc }) => {
    return (
        <div className="flex items-center gap-4 border border-gray-bg rounded-4xl p-4">
            <Image src={imageSrc || "/images/meal/vegan_energy_boost.png"} alt={title} width={150} height={150} className="rounded-4xl" />
            <div className="flex flex-col gap-4">
                <h3 className="text-black text-lg">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className={`text-gray-30 ${getBgColorClass(mealTime)} px-4 py-1 rounded-4xl`}>{mealTime}</span>
                    <span className="text-gray-30 bg-gray-bg px-4 py-1 rounded-4xl flex items-center gap-1">
                        <ChartBarSvg height="20" width="20" color="#878a94" />
                        {difficulty}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RecommendedMealCard

