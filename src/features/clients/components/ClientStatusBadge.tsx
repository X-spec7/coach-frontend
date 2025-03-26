import type React from "react"
import type { ClientStatus } from "../types/client.dto"

interface ClientStatusBadgeProps {
    status: ClientStatus
    className?: string
}

const ClientStatusBadge: React.FC<ClientStatusBadgeProps> = ({ status, className = "" }) => {
    const getStatusColor = () => {
        switch (status) {
            case "active":
                return "bg-green-500"
            case "inactive":
                return "bg-gray-400"
            case "pending":
                return "bg-yellow-500"
            default:
                return "bg-gray-400"
        }
    }

    return <div className={`h-2 w-2 rounded-full ${getStatusColor()} ${className}`}></div>
}

export default ClientStatusBadge

