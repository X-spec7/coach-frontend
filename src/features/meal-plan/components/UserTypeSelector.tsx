"use client"

import type React from "react"

type UserType = "coach" | "client"

interface UserTypeSelectorProps {
    userType: UserType
    onChange: (userType: UserType) => void
    className?: string
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, onChange, className = "" }) => {
    return (
        <div className={`flex rounded-full bg-gray-200 p-1 ${className}`}>
            <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${userType === "coach" ? "bg-green text-black" : "text-gray-700 hover:bg-gray-300"
                    }`}
                onClick={() => onChange("coach")}
            >
                Coach Mode
            </button>
            <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${userType === "client" ? "bg-green text-black" : "text-gray-700 hover:bg-gray-300"
                    }`}
                onClick={() => onChange("client")}
            >
                Client Mode
            </button>
        </div>
    )
}

export default UserTypeSelector

