"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiSearch, FiUser } from "react-icons/fi"

interface Client {
    id: string
    name: string
    email: string
    avatar?: string
}

interface ClientSelectorProps {
    selectedClient: string
    onChange: (clientId: string) => void
    className?: string
}

const ClientSelector: React.FC<ClientSelectorProps> = ({ selectedClient, onChange, className = "" }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [clients, setClients] = useState<Client[]>([])
    const [filteredClients, setFilteredClients] = useState<Client[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // In a real app, this would fetch clients from an API
        const fetchClients = async () => {
            setIsLoading(true)
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 500))

                // Mock data
                const mockClients: Client[] = [
                    { id: "1", name: "John Doe", email: "john.doe@example.com" },
                    { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
                    { id: "3", name: "Robert Johnson", email: "robert.johnson@example.com" },
                    { id: "4", name: "Emily Davis", email: "emily.davis@example.com" },
                    { id: "5", name: "Michael Wilson", email: "michael.wilson@example.com" },
                ]

                setClients(mockClients)
                setFilteredClients(mockClients)
            } catch (error) {
                console.error("Error fetching clients:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchClients()
    }, [])

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredClients(clients)
        } else {
            const filtered = clients.filter(
                (client) =>
                    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    client.email.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            setFilteredClients(filtered)
        }
    }, [searchTerm, clients])

    return (
        <div className={className}>
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                </div>
            ) : filteredClients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredClients.map((client) => (
                        <div
                            key={client.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedClient === client.id ? "border-green-500 bg-green-50" : "border-gray-200 hover:bg-gray-50"
                                }`}
                            onClick={() => onChange(client.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    {client.avatar ? (
                                        <img
                                            src={client.avatar || "/placeholder.svg"}
                                            alt={client.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    ) : (
                                        <FiUser size={20} className="text-gray-500" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium">{client.name}</div>
                                    <div className="text-sm text-gray-500">{client.email}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">No clients found matching your search.</div>
            )}
        </div>
    )
}

export default ClientSelector

