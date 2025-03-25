import type React from "react"

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg"
    className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", className = "" }) => {
    const getSizeClass = () => {
        switch (size) {
            case "sm":
                return "h-6 w-6 border-2"
            case "md":
                return "h-12 w-12 border-t-2 border-b-2"
            case "lg":
                return "h-16 w-16 border-4"
            default:
                return "h-12 w-12 border-t-2 border-b-2"
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full ${getSizeClass()} border-green-500 ${className}`}></div>
        </div>
    )
}

export default LoadingSpinner

