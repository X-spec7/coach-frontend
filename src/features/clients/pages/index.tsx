"use client"

import type React from "react"
import { useState, useEffect } from "react"
import ClientSearch from "../components/ClientSearch"
import ClientsTable from "../components/ClientsTable"
import Pagination from "../components/Pagination"
import AddClientButton from "../components/AddClientButton"
import type { ClientFilter, ClientsResponse } from "../types/client.dto"
import { ClientService } from "../services/client.service"

const ClientsPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [clientData, setClientData] = useState<ClientsResponse>({
        clients: [],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
        },
    })
    const [filters, setFilters] = useState<ClientFilter>({})

    useEffect(() => {
        fetchClients()
    }, [filters, clientData.pagination.page, clientData.pagination.limit])

    const fetchClients = async () => {
        setLoading(true)
        try {
            const response = await ClientService.getClients(filters, {
                page: clientData.pagination.page,
                limit: clientData.pagination.limit,
            })
            setClientData(response)
        } catch (error) {
            console.error("Error fetching clients:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleFilterChange = (newFilters: ClientFilter) => {
        setFilters(newFilters)
        // Reset to page 1 when filters change
        setClientData((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: 1,
            },
        }))
    }

    const handlePageChange = (page: number) => {
        setClientData((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page,
            },
        }))
    }

    const handleLimitChange = (limit: number) => {
        setClientData((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: 1, // Reset to page 1 when limit changes
                limit,
            },
        }))
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <ClientSearch onFilterChange={handleFilterChange} />
                <AddClientButton />
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            ) : (
                <>
                    <div className="border rounded-lg overflow-hidden">
                        <ClientsTable clients={clientData.clients} />
                    </div>

                    <div className="mt-4">
                        <Pagination
                            pagination={clientData.pagination}
                            onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default ClientsPage

