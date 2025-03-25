"use client"

import type React from "react"

interface ActionButtonProps {
    variant: "primary" | "danger" | "outline"
    onClick: () => void
    children: React.ReactNode
    className?: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ variant, onClick, children, className = "" }) => {
    const getButtonStyles = () => {
        switch (variant) {
            case "primary":
                return "bg-green hover:bg-green-dark text-black"
            case "danger":
                return "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
            case "outline":
                return "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50"
            default:
                return "bg-green hover:bg-green-dark text-black"
        }
    }

    return (
        <button className={`px-4 py-2 rounded-20 ${getButtonStyles()} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default ActionButton

