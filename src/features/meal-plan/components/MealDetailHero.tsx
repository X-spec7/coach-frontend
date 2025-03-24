import type React from "react"
import Image from "next/image"
import type { Meal } from "../types/class.dto"
import { ChartBarSvg, StarSvg } from "@/shared/components/Svg"
import { CiForkAndKnife } from "react-icons/ci";
import { PiKnife, PiCookingPot, PiListNumbers, PiHeartbeat } from "react-icons/pi";
import { getBgColorClass } from "../hooks/getBgColorClass";


interface MealDetailHeroProps {
    meal: Meal
}

const MealDetailHero: React.FC<MealDetailHeroProps> = ({ meal }) => {
    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-4xl shadow-md">
            <div className="rounded-2xl overflow-hidden h-full">
                <Image
                    src={meal.image || "/images/meal/pasta.png"}
                    alt={meal.mealTitle}
                    width={380}
                    height={380}
                    className="w-full object-cover h-full"
                />
            </div>
            <div className="space-y-6">
                <span className={`text-gray-30 ${getBgColorClass(meal.mealTime)} px-4 py-2 rounded-xl`}>{meal.mealTime}</span>
                <h1 className="text-2xl font-medium my-4">{meal.mealTitle}</h1>
                <p className="text-gray-30 text-sm my-4">{meal.description}</p>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-yellow rounded-full h-8 w-8 justify-center">
                            <CiForkAndKnife className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-20">Eat Time</span>
                            <span className="text-sm font-medium">{meal.eatingTime}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-yellow rounded-full h-8 w-8 justify-center">
                            <PiKnife className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-20">Prep Time</span>
                            <span className="text-sm font-medium">{meal.prepTime} minutes</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-yellow rounded-full h-8 w-8 justify-center">
                            <PiCookingPot className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-20">Cook Time</span>
                            <span className="text-sm font-medium">{meal.cookTime} minutes</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-yellow rounded-full h-8 w-8 justify-center">
                            <ChartBarSvg height="20" width="20" color="#000" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-20">Difficulty</span>
                            <span className="text-sm font-medium">{meal.difficulty}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-yellow rounded-full h-8 w-8 justify-center">
                            <PiListNumbers className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-20">Total Steps</span>
                            <span className="text-sm font-medium">{meal.steps?.length ?? 0}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-yellow rounded-full h-8 w-8 justify-center">
                            <PiHeartbeat className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-20">Health Score</span>
                            <span className="text-sm font-medium">
                                {meal.healthScore}/100
                            </span>
                        </div>
                    </div>

                    {meal.rating && (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-yellow rounded-full h-8 w-8 justify-center">
                                <StarSvg height="20" width="20" color="#FFF080" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-20">Rating</span>
                                <span className="text-sm font-medium">
                                    {meal.rating}/5 ({meal.reviews?.length || 0} reviews)
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MealDetailHero

