"use client"

import type React from "react"
import type { PaginationOptions } from "../types/client.dto"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

interface PaginationProps {
    pagination: PaginationOptions
    onPageChange: (page: number) => void
    onLimitChange: (limit: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange, onLimitChange }) => {
    const { page, limit, total } = pagination
    const totalPages = Math.ceil(total / limit)

    const handlePrevious = () => {
        if (page > 1) {
            onPageChange(page - 1)
        }
    }

    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1)
        }
    }

    return (
        <div className="flex items-center justify-between py-3 bg-white">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(page * limit, total)}</span> of{" "}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={handlePrevious}
                            disabled={page === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Previous</span>
                            <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                            const pageNumber = i + 1
                            return (
                                <button
                                    key={i}
                                    onClick={() => onPageChange(pageNumber)}
                                    className={`relative inline-flex items-center px-4 py-2 border ${page === pageNumber
                                            ? "bg-green-50 border-green-500 text-green-600"
                                            : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                                        } text-sm font-medium`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        })}

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Next</span>
                            <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination

