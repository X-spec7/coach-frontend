"use client"

import type React from "react"
import { useState } from "react"
import type { NutritionFacts } from "../types/class.dto"
import { LuChevronDown, LuChevronUp } from "react-icons/lu"

interface MealNutritionFactsProps {
    nutritionFacts: NutritionFacts
}

const MealNutritionFacts: React.FC<MealNutritionFactsProps> = ({ nutritionFacts }) => {
    const [isOpen, setIsOpen] = useState(true)

    const NutritionRow: React.FC<{ label: string; value: number | string; unit?: string; indent?: boolean; bold?: boolean }> = ({ label, value, unit = "gr", indent = false, bold = false }) => (
        <div className={`flex justify-between py-1 ${indent ? "pl-4" : ""} ${bold ? "font-bold" : ""}`}>
            <span className="text-base text-gray-30">{label}</span>
            <span className="text-sm text-gray-30">
                {value}
                {unit}
            </span>
        </div>
    )

    return (
        <div className="bg-white rounded-4xl shadow-md">
            <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h2 className="text-lg font-semibold">Nutrition Facts</h2>
                <span className="bg-gray-bg p-2 rounded-full">
                    {isOpen ? <LuChevronUp className="h-5 w-5" /> : <LuChevronDown className="h-5 w-5" />}
                </span>
            </div>

            {isOpen && (
                <div className="p-4 pt-0">
                    <span className="text-sm text-gray-30 flex justify-end">
                        Per Serving
                    </span>
                    <NutritionRow label="Calories" value={nutritionFacts.calories} unit="" bold={true} />
                    <div className="border-t-2 border-gray-bg my-2" />

                    <NutritionRow label="Total Carbohydrates" value={nutritionFacts.totalCarbohydrates} bold={true} />
                    <NutritionRow label="Dietary Fiber" value={nutritionFacts.dietaryFiber} indent={true} />
                    <NutritionRow label="Sugars" value={nutritionFacts.sugars} indent={true} />

                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Protein" value={nutritionFacts.protein} bold={true} />

                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Total Fat" value={nutritionFacts.totalFat} bold={true} />
                    <NutritionRow label="Saturated Fat" value={nutritionFacts.saturatedFat} indent={true} />
                    <NutritionRow label="Trans Fat" value={nutritionFacts.transFat} indent={true} />

                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Cholesterol" value={nutritionFacts.cholesterol} unit="mg" bold={true} />
                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Sodium" value={nutritionFacts.sodium} unit="mg" bold={true} />
                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Potassium" value={nutritionFacts.potassium} unit="mg" bold={true} />

                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Vitamin A" value={nutritionFacts.vitaminA} unit="%" bold={true} />
                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Vitamin C" value={nutritionFacts.vitaminC} unit="%" bold={true} />
                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Calcium" value={nutritionFacts.calcium} unit="%" bold={true} />
                    <div className="border-t-2 border-gray-bg my-2" />
                    <NutritionRow label="Iron" value={nutritionFacts.iron} unit="%" bold={true} />
                </div>
            )}
        </div>
    )
}

export default MealNutritionFacts

