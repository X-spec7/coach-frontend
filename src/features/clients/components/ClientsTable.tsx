"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Client } from "../types/client.dto"
import ClientStatusBadge from "./ClientStatusBadge"
import { FiMail } from "react-icons/fi"

interface ClientsTableProps {
    clients: Client[]
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
    const router = useRouter()

    const handleClientClick = (clientId: string) => {
        router.push(`/clients/${clientId}`)
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Clients
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Coach
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member since
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activated on
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check-in
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last online
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Status</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((client) => (
                        <tr
                            key={client.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleClientClick(client.id)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        {client.avatar ? (
                                            <Image
                                                src={client.avatar || "/placeholder.svg"}
                                                alt={client.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <span className="text-blue-500 font-medium">{client.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{client.coach}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{client.memberSince}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{client.activatedOn}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{client.lastCheckIn || "-"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{client.lastOnline}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <ClientStatusBadge status={client.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ClientsTable

