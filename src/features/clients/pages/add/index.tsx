"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import ClientForm from "../../components/ClientForm"
import { FiArrowLeft } from "react-icons/fi"

const AddClientPage: React.FC = () => {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <div>
            <div className="flex items-center mb-6">
                <button onClick={handleBack} className="mr-4 p-2 rounded-full hover:bg-gray-100" title="Go back">
                    <FiArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-semibold">Add New Client</h1>
            </div>

            <ClientForm />
        </div>
    )
}

export default AddClientPage

