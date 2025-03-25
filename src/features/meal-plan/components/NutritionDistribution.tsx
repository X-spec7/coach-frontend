"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Nutrition } from "../types/class.dto"

interface NutritionDistributionProps {
    nutrition: Nutrition
    onChange: (nutrition: Nutrition) => void
    className?: string
}

const NutritionDistribution: React.FC<NutritionDistributionProps> = ({ nutrition, onChange, className = "" }) => {
    const [carb, setCarb] = useState(nutrition.carb)
    const [protein, setProtein] = useState(nutrition.protein)
    const [fat, setFat] = useState(nutrition.fat)
    const [total, setTotal] = useState(carb + protein + fat)

    useEffect(() => {
        setTotal(carb + protein + fat)
    }, [carb, protein, fat])

    const handleCarbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value) || 0
        setCarb(value)
        onChange({ carb: value, protein, fat })
    }

    const handleProteinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value) || 0
        setProtein(value)
        onChange({ carb, protein: value, fat })
    }

    const handleFatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value) || 0
        setFat(value)
        onChange({ carb, protein, fat: value })
    }

    const calculatePercentage = (value: number) => {
        if (total === 0) return 0
        return Math.round((value / total) * 100)
    }

    const carbPercentage = calculatePercentage(carb)
    const proteinPercentage = calculatePercentage(protein)
    const fatPercentage = calculatePercentage(fat)

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex h-8 w-full rounded-full overflow-hidden">
                <div className="bg-blue-400" style={{ width: `${carbPercentage}%` }}></div>
                <div className="bg-red-400" style={{ width: `${proteinPercentage}%` }}></div>
                <div className="bg-yellow-400" style={{ width: `${fatPercentage}%` }}></div>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>Carbs ({carbPercentage}%)</span>
                        <span>{carb}g</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="300"
                        value={carb}
                        onChange={handleCarbChange}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-400"
                        title="Carbs"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>Proteins ({proteinPercentage}%)</span>
                        <span>{protein}g</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="300"
                        value={protein}
                        onChange={handleProteinChange}
                        className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-400"
                        title="Proteins"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>Fats ({fatPercentage}%)</span>
                        <span>{fat}g</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="300"
                        value={fat}
                        onChange={handleFatChange}
                        className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                        title="Fats"
                    />
                </div>
            </div>
        </div>
    )
}

export default NutritionDistribution

