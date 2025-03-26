"use client"

import type React from "react"
import { useState } from "react"
import type { ClientFilter } from "../types/client.dto"
import { FiFilter, FiSearch } from "react-icons/fi"

interface ClientSearchProps {
    onFilterChange: (filters: ClientFilter) => void
}

const ClientSearch: React.FC<ClientSearchProps> = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState<ClientFilter>({})

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        onFilterChange({ ...filters, search: value })
    }

    const handleFilterClick = () => {
        setShowFilters(!showFilters)
    }

    const handleStatusChange = (status: string) => {
        const newFilters = {
            ...filters,
            status: status as any,
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
        setShowFilters(false)
    }

    const handleCoachChange = (coach: string) => {
        const newFilters = {
            ...filters,
            coach: coach || undefined,
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
        setShowFilters(false)
    }

    return (
        <div className="flex items-center gap-4">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search clients"
                    className="pl-10 w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none "
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="relative">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                    onClick={handleFilterClick}
                >
                    <FiFilter className="h-4 w-4" />
                    <span>Status</span>
                </button>

                {showFilters && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-white shadow-lg rounded-md z-10">
                        <div className="py-1">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleStatusChange("")}
                            >
                                All Clients
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleStatusChange("active")}
                            >
                                Active
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleStatusChange("inactive")}
                            >
                                Inactive
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleStatusChange("pending")}
                            >
                                Pending
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">More</button>
            </div>
        </div>
    )
}

export default ClientSearch

