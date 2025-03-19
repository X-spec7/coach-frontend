"use client"

import type React from "react"
import { CategoryChip } from "./CategoryChip"
import type { ClassCategory } from "../types/class.dto"

interface CategoryListProps {
    categories: ClassCategory[]
    selectedCategories: string[]
    toggleCategory: (categoryId: string) => void
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategories, toggleCategory }) => {
    return (
        <div className="flex gap-2 mb-6 overflow-x-auto p-2">
            {categories.map((category) => (
                <CategoryChip
                    key={category.id}
                    category={category}
                    isSelected={selectedCategories.includes(category.id)}
                    onClick={() => toggleCategory(category.id)}
                />
            ))}
        </div>
    )
}

export default CategoryList

