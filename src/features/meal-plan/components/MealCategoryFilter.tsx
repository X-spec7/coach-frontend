"use client"

import type React from "react"

interface MealCategoryFilterProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

const categories = ["All", "Breakfast", "Lunch", "Snack", "Dinner"]

const MealCategoryFilter: React.FC<MealCategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="flex items-center gap-1 bg-gray-bg p-1 rounded-4xl">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-5 py-2 rounded-full ${selectedCategory === category ? "bg-green" : ""}`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default MealCategoryFilter

