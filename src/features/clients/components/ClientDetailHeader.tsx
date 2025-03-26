"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Client } from "../types/client.dto"
import ClientStatusBadge from "./ClientStatusBadge"
import { FiArrowLeft, FiEdit, FiMail, FiMoreHorizontal, FiPhone, FiTrash } from "react-icons/fi"

interface ClientDetailHeaderProps {
    client: Client
}

const ClientDetailHeader: React.FC<ClientDetailHeaderProps> = ({ client }) => {
    const router = useRouter()
    const [showMenu, setShowMenu] = React.useState(false)

    const handleBack = () => {
        router.back()
    }

    const handleEdit = () => {
        router.push(`/clients/edit/${client.id}`)
        setShowMenu(false)
    }

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this client?")) {
            try {
                // In a real app, this would call an API
                await new Promise((resolve) => setTimeout(resolve, 500))
                router.push("/clients")
            } catch (error) {
                console.error("Error deleting client:", error)
                alert("There was an error deleting the client. Please try again.")
            }
        }
        setShowMenu(false)
    }

    return (
        <div className="bg-white shadow rounded-lg mb-6">
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <button onClick={handleBack} className="mr-4 p-2 rounded-full hover:bg-gray-100" title="Go back">
                        <FiArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-xl font-semibold">Client Details</h1>
                    <div className="ml-auto relative">
                        <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setShowMenu(!showMenu)} title="More options">
                            <FiMoreHorizontal className="h-5 w-5" />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <div className="py-1">
                                    <button
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleEdit}
                                    >
                                        <FiEdit className="h-4 w-4 mr-2" />
                                        Edit Client
                                    </button>
                                    <button
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        onClick={handleDelete}
                                    >
                                        <FiTrash className="h-4 w-4 mr-2" />
                                        Delete Client
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center">
                            {client.avatar ? (
                                <Image
                                    src={client.avatar || "/placeholder.svg"}
                                    alt={client.name}
                                    width={96}
                                    height={96}
                                    className="rounded-full"
                                />
                            ) : (
                                <span className="text-blue-500 text-3xl font-medium">{client.name.charAt(0)}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-bold">{client.name}</h2>
                            <ClientStatusBadge status={client.status} className="ml-2" />
                        </div>

                        <div className="text-gray-500 mb-4">Member since {client.memberSince}</div>

                        <div className="flex flex-wrap gap-4">
                            {client.email && (
                                <div className="flex items-center gap-2">
                                    <FiMail className="h-4 w-4 text-gray-400" />
                                    <span>{client.email}</span>
                                </div>
                            )}

                            {client.phone && (
                                <div className="flex items-center gap-2">
                                    <FiPhone className="h-4 w-4 text-gray-400" />
                                    <span>{client.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientDetailHeader

