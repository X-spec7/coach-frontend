"use client"

import type React from "react"
import { DayOfWeek } from "../types/class.dto"

interface DaySelectorProps {
    selectedDay: DayOfWeek
    onChange: (day: DayOfWeek) => void
    className?: string
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, onChange, className = "" }) => {
    const days: { value: DayOfWeek; label: string }[] = [
        { value: "all", label: "All Days" },
        { value: "monday", label: "Monday" },
        { value: "tuesday", label: "Tuesday" },
        { value: "wednesday", label: "Wednesday" },
        { value: "thursday", label: "Thursday" },
        { value: "friday", label: "Friday" },
        { value: "saturday", label: "Saturday" },
        { value: "sunday", label: "Sunday" },
    ]

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {days.map((day) => (
                <button
                    key={day.value}
                    type="button"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedDay === day.value ? "bg-green text-black" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    onClick={() => onChange(day.value)}
                >
                    {day.label}
                </button>
            ))}
        </div>
    )
}

export default DaySelector

