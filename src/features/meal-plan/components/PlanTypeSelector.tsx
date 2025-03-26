"use client"

import type React from "react"

interface PlanTypeSelectorProps {
    planType: "daily" | "weekly"
    onChange: (planType: "daily" | "weekly") => void
    className?: string
}

const PlanTypeSelector: React.FC<PlanTypeSelectorProps> = ({ planType, onChange, className = "" }) => {
    return (
        <div className={`flex rounded-full bg-gray-200 p-1 ${className}`}>
            <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${planType === "daily" ? "bg-green text-black" : "text-gray-700 hover:bg-gray-300"
                    }`}
                onClick={() => onChange("daily")}
            >
                Daily Plan
            </button>
            <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${planType === "weekly" ? "bg-green text-black" : "text-gray-700 hover:bg-gray-300"
                    }`}
                onClick={() => onChange("weekly")}
            >
                Weekly Plan
            </button>
        </div>
    )
}

export default PlanTypeSelector

