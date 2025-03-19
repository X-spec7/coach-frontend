import type React from "react"
import Image from "next/image"
import { StarSvg } from "@/shared/components/Svg"
import { getBgColorClass } from "../hooks/getBgColorClass"

interface PopularMealCardProps {
    title: string
    rating: number
    mealTime: string
    imageSrc: string
}

const PopularMealCard: React.FC<PopularMealCardProps> = ({ title, rating, mealTime, imageSrc }) => {
    return (
        <div className="flex items-center gap-4 border border-gray-bg rounded-4xl p-4">
            <Image src={imageSrc || "/images/meal/vegan_energy_boost.png"} alt={title} width={150} height={150} className="rounded-4xl" />
            <div className="flex flex-col gap-4">
                <h3 className="text-black text-lg">{title}</h3>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border border-gray-bg rounded-4xl px-2 py-1">
                        <StarSvg height="20" width="20" color="#FFF080" />
                        <span>{rating}/5</span>
                    </div>
                    <span className={`text-gray-30 ${getBgColorClass(mealTime)} px-4 py-1 rounded-4xl`}>{mealTime}</span>
                </div>
            </div>
        </div>
    )
}

export default PopularMealCard

