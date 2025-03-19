"use client"

import type React from "react"
import { SearchField } from "@/shared/components"
import { CaretDownSvg, FilterSvg } from "@/shared/components/Svg"

interface MealHeaderProps {
    onAddMenu: () => void
}

const MealHeader: React.FC<MealHeaderProps> = ({ onAddMenu }) => {
    return (
        <div className="w-full flex justify-between items-center">
            <h2 className="text-black text-base">All Menu</h2>
            <div className="flex items-center gap-4">
                <SearchField
                    width="w-full"
                    height="p-2"
                    placeholder="Search for menu"
                />
                <button className="flex items-center gap-1 bg-gray-bg px-4 py-2 rounded-4xl">
                    <FilterSvg height="20" width="20" color="#000" />
                    <span className="text-sm">Filter</span>
                    <CaretDownSvg height="20" width="20" color="#000" />
                </button>
                <button className="bg-green px-3 py-2 rounded-4xl gap-2 max-w-[100px] w-full" onClick={onAddMenu}>
                    Add Menu
                </button>
            </div>
        </div>
    )
}

export default MealHeader

