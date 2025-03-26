"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { PiUserCirclePlus } from "react-icons/pi"

const AddClientButton: React.FC = () => {
    const router = useRouter()

    const handleAddClient = () => {
        router.push("/clients/add")
    }

    return (
        <button
            onClick={handleAddClient}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-green hover:bg-green-dark"
        >
            <PiUserCirclePlus className="h-5 w-5 mr-1" />
            Add client
        </button>
    )
}

export default AddClientButton

