"use client"

import type React from "react"
import type { VisibilityType } from "../types/class.dto"

interface VisibilitySelectorProps {
    value: VisibilityType
    onChange: (value: VisibilityType) => void
    className?: string
}

const VisibilitySelector: React.FC<VisibilitySelectorProps> = ({ value, onChange, className = "" }) => {
    const options: { value: VisibilityType; label: string }[] = [
        { value: "private", label: "Only myself" },
        { value: "clients", label: "My clients" },
        { value: "coaches", label: "My coaches" },
        { value: "public", label: "Everyone" },
    ]

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Visible for</label>
            <div className="relative">
                <select
                    aria-label="Visibility Selector"
                    value={value}
                    onChange={(e) => onChange(e.target.value as VisibilityType)}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm appearance-none"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default VisibilitySelector

