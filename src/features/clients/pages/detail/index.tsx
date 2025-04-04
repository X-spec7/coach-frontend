"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Client } from "../../types/client.dto"
import { ClientService } from "../../services/client.service"
import ClientDetailHeader from "../../components/ClientDetailHeader"
import ClientDetailTabs from "../../components/ClientDetailTabs"

interface ClientDetailPageProps {
    id: string
}

const ClientDetailPage: React.FC<ClientDetailPageProps> = ({ id }) => {
    const router = useRouter()
    const [client, setClient] = useState<Client | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchClient = async () => {
            setLoading(true)
            try {
                const data = await ClientService.getClientById(id)
                if (data) {
                    setClient(data)
                } else {
                    // Handle not found
                    router.push("/clients")
                }
            } catch (error) {
                console.error("Error fetching client:", error)
                router.push("/clients")
            } finally {
                setLoading(false)
            }
        }

        fetchClient()
    }, [id, router])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        )
    }

    if (!client) {
        return (
            <div className="text-center py-8">
                <h2 className="text-xl font-semibold">Client not found</h2>
                <p className="mt-2 text-gray-600">The client you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => router.push("/clients")}>
                    Back to Clients
                </button>
            </div>
        )
    }

    return (
        <div>
            <ClientDetailHeader client={client} />
            <ClientDetailTabs client={client} />
        </div>
    )
}

export default ClientDetailPage

