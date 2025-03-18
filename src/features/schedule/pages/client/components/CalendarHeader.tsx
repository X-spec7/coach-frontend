"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import { CaretDownSvg, CaretLeftSvg, CaretRightSvg } from "@/shared/components/Svg"
import { ClickOutside } from "@/shared/components"
import type { CalendarView, ClassCategory } from "../../../types/class.dto"

interface CalendarHeaderProps {
    currentDate: Date
    view: CalendarView
    setView: (view: CalendarView) => void
    navigatePrevious: () => void
    navigateNext: () => void
    selectedCategories: string[]
    selectAllCategories: () => void
    clearAllCategories: () => void
    categories: ClassCategory[]
    toggleCategory: (categoryId: string) => void
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    currentDate,
    view,
    setView,
    navigatePrevious,
    navigateNext,
    selectedCategories,
    selectAllCategories,
    clearAllCategories,
    categories,
    toggleCategory,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    function toggleDropdown() {
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="flex items-center justify-between mb-4 w-full">
            <div className="flex items-center gap-2">
                <h2 className="font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
                <CaretDownSvg height="20" width="20" color="#000" />
                <div className="flex items-center gap-2">
                    <button className="p-1 rounded-full border border-gray-bg" title="Previous" onClick={navigatePrevious}>
                        <CaretLeftSvg height="20" width="20" color="#000" />
                    </button>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {view === "day" ? "Today" : view === "week" ? "This Week" : "This Month"}
                    </span>
                    <button className="p-1 rounded-full bg-gray-bg" title="Next" onClick={navigateNext}>
                        <CaretRightSvg height="20" width="20" color="#000" />
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative inline-block" ref={dropdownRef}>
                    <ClickOutside onClick={() => setIsOpen(false)}>
                        {/* Dropdown Button */}
                        <button
                            onClick={toggleDropdown}
                            className="px-3 py-1 h-9 rounded-full text-sm flex items-center gap-1 border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                            {selectedCategories.length === 0
                                ? "All Categories"
                                : selectedCategories.length === categories.length
                                    ? "All Categories"
                                    : `${selectedCategories.length} Selected`}
                            <CaretDownSvg height="20" width="20" color="#000" />
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                                {/* Header Actions */}
                                <div className="flex justify-between px-2 py-1.5 text-xs bg-gray-100 border-b">
                                    <button onClick={selectAllCategories} className="text-blue-600 hover:underline">
                                        Select All
                                    </button>
                                    <button onClick={clearAllCategories} className="text-red-500 hover:underline">
                                        Clear All
                                    </button>
                                </div>

                                {/* Category Items */}
                                <ul className="max-h-60 overflow-auto p-2">
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                        >
                                            <label className="flex items-center gap-4 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category.id)}
                                                    onChange={() => toggleCategory(category.id)}
                                                    className="h-4 w-4 cursor-pointer"
                                                    title={`Select ${category.name}`}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <div className={`flex items-center justify-center h-6 w-6 rounded ${category.bgColor}`}>
                                                        {category.icon}
                                                    </div>
                                                    <span className="text-xs">{category.name}</span>
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </ClickOutside>
                </div>
                <div className="flex bg-gray-bg rounded-full p-1">
                    <button
                        className={`px-3 py-1 text-sm ${view === "day" ? "bg-green rounded-full" : ""}`}
                        onClick={() => setView("day")}
                    >
                        Day
                    </button>
                    <button
                        className={`px-3 py-1 text-sm ${view === "week" ? "bg-green rounded-full" : ""}`}
                        onClick={() => setView("week")}
                    >
                        Week
                    </button>
                    <button
                        className={`px-3 py-1 text-sm ${view === "month" ? "bg-green rounded-full" : ""}`}
                        onClick={() => setView("month")}
                    >
                        Month
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CalendarHeader

