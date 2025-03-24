import type React from "react"

interface StatusBadgeProps {
    status: string
    className?: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-500 text-white"
            case "completed":
                return "bg-blue-500 text-white"
            case "upcoming":
                return "bg-yellow-500 text-black"
            default:
                return "bg-gray-500 text-white"
        }
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(status)} ${className}`}>
            {status}
        </span>
    )
}

export default StatusBadge

