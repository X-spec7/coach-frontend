import type React from "react"
import { CaretDownSvg } from "@/shared/components/Svg"

interface MealSortDropdownProps {
    sortBy: string
    onSortChange: (sortOption: string) => void
}

const MealSortDropdown: React.FC<MealSortDropdownProps> = ({ sortBy, onSortChange }) => {
    return (
        <div className="flex items-center gap-2">
            <p className="text-gray-20 text-sm">Sort by:</p>
            <button className="bg-gray-bg px-4 py-3 rounded-4xl flex items-center gap-2">
                {sortBy}
                <CaretDownSvg height="20" width="20" color="#000" />
            </button>
        </div>
    )
}

export default MealSortDropdown

