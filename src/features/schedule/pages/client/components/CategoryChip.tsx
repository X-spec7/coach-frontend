"use client"

import cn from "classnames"
import type { ClassCategory } from "../../../types/class.dto"

interface CategoryChipProps {
    category: ClassCategory
    isSelected: boolean
    onClick: () => void
}

export function CategoryChip({ category, isSelected, onClick }: CategoryChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all w-full",
                category.bgColor,
                isSelected ? `ring-2 ring-offset-1 ring-${category.bgColor.replace("bg-", "")}` : "opacity-80 hover:opacity-100",
            )}
        >
            {category.icon}
            <span>{category.name}</span>
        </button>
    )
}

