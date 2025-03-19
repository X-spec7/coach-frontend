"use client"

import type React from "react"
import { useState } from "react"
import type { MealIngredient } from "../types/class.dto"
import { LuChevronDown, LuChevronUp, LuDot } from "react-icons/lu"
import { BoulFoodSvg } from "@/shared/components/Svg"

interface MealIngredientsProps {
    ingredients: MealIngredient[]
    servings: number
}

const MealIngredients: React.FC<MealIngredientsProps> = ({ ingredients, servings }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [currentServings, setCurrentServings] = useState(servings)

    const handleServingsChange = (newServings: number) => {
        if (newServings > 0) {
            setCurrentServings(newServings)
        }
    }

    // Calculate ingredient amounts based on servings
    const calculateAmount = (amount: string, originalServings: number) => {
        if (!amount || isNaN(Number(amount))) return amount

        const ratio = currentServings / originalServings
        const newAmount = Number(amount) * ratio

        // Format to at most 1 decimal place if needed
        return newAmount % 1 === 0 ? newAmount.toString() : newAmount.toFixed(1)
    }

    return (
        <div className="bg-white rounded-4xl shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-yellow rounded-full h-8 w-8 justify-center">
                        <BoulFoodSvg height="20" width="20" color="#4D5260" />
                    </div>
                    <span className="text-sm text-gray-20 font-medium">Your <br /> Servings</span>
                </div>
                <div className="flex items-center gap-0.5 bg-gray-bg-subtle rounded-full p-1">
                    <span className="w-8 text-center">{currentServings}</span>
                    <button data-size="xSmall" data-type="Default" className="p-[5px] bg-green rounded-tl-[20px] rounded-bl-[20px] inline-flex justify-start items-start gap-2" title="Decrease servings" onClick={() => handleServingsChange(currentServings - 1)}>
                        <div className="w-4 h-4 relative overflow-hidden">
                            <div className="w-3 h-px left-[2px] top-[7.50px] absolute bg-[#212738]" />
                        </div>
                    </button>
                    <button data-size="xSmall" data-type="Default" className="p-[5px] bg-green rounded-tr-[20px] rounded-br-[20px] inline-flex justify-start items-start gap-2" onClick={() => handleServingsChange(currentServings + 1)}>
                        <div className="w-4 h-4 flex items-center justify-center">
                            +
                        </div>
                    </button>
                </div>
            </div>
            <div className="border-t-2 border-gray-bg my-2" />
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h2 className="text-lg font-semibold">Ingredients</h2>
                <span className="bg-gray-bg p-2 rounded-full">
                    {isOpen ? <LuChevronUp className="h-5 w-5" /> : <LuChevronDown className="h-5 w-5" />}
                </span>
            </div>

            {isOpen && (
                <div className="pt-4">
                    <ul className="space-y-3">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="bg-blue h-5 w-5 rounded-full flex items-center justify-center">
                                    <LuDot color="#000" size="20" />
                                </span>
                                <span className="text-sm">
                                    {ingredient.amount
                                        ? `${calculateAmount(ingredient.amount, servings)} ${ingredient.unit || ""} of ${ingredient.name}`
                                        : ingredient.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default MealIngredients

