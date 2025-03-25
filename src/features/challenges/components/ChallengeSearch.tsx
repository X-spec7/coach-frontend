"use client"

import type React from "react"
import { useState } from "react"
import { PiMagnifyingGlassBold } from "react-icons/pi"
import { CaretDownSvg } from "@/shared/components/Svg"
import { ChallengeFilter } from "../types"

interface ChallengeSearchProps {
    onFilterChange: (filters: ChallengeFilter) => void
}

const ChallengeSearch: React.FC<ChallengeSearchProps> = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState<ChallengeFilter>({})

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

    return (
        <div className="flex justify-center items-center gap-5">
            <div className="flex items-center gap-2 bg-gray-100 rounded-4xl p-2 w-1/3">
                <PiMagnifyingGlassBold size={20} color="#4d5260" />
                <input
                    type="text"
                    placeholder="Search Challenges"
                    className="bg-transparent outline-none w-full"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="relative">
                <div
                    className="flex items-center gap-2 bg-gray-bg rounded-4xl p-2 px-4 cursor-pointer"
                    onClick={handleFilterClick}
                >
                    <p className="text-gray-20 text-sm">Filter challenges</p>
                    <button className="flex items-center" title="Toggle Filters">
                        <CaretDownSvg height="20" width="20" color="#000" />
                    </button>
                </div>
                {showFilters && (
                    <div className="absolute top-full mt-2 left-0 w-48 bg-white shadow-lg rounded-4xl z-10">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleStatusChange("active")}>
                                Active
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleStatusChange("completed")}
                            >
                                Completed
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleStatusChange("upcoming")}>
                                Upcoming
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleStatusChange("")}>
                                All Challenges
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChallengeSearch

