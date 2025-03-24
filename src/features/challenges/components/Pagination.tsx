"use client"

import type React from "react"
import { CaretLeftSvg, CaretRightSvg, CaretDownSvg } from "@/shared/components/Svg"
import { PaginationOptions } from "../types"

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

    const renderPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 3

        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <div
                    key={i}
                    className={`h-10 w-10 ${i === page ? "bg-[#daf17e]" : "bg-gray-bg"
                        } rounded-full inline-flex justify-center items-center gap-0.5 cursor-pointer`}
                    onClick={() => onPageChange(i)}
                >
                    <div className="inline-flex justify-start items-center gap-2.5">
                        <span>{i}</span>
                    </div>
                </div>,
            )
        }

        return pages
    }

    return (
        <div className="flex items-center justify-between gap-5 mt-6">
            <div className="inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-gray-20 text-xxs font-normal">Showing</div>
                <div
                    data-size="small"
                    data-type="Secondary"
                    data-with-Icon="Right"
                    className="pl-2 pr-1.5 py-1.5 bg-[#eeeef0] rounded-full flex justify-start items-center gap-1 cursor-pointer"
                    onClick={() => onLimitChange(limit === 12 ? 24 : 12)}
                >
                    <div className="px-0.5 flex justify-start items-center gap-2.5">
                        <div className="text-center justify-start text-gray-30 text-xxs font-medium leading-3">{limit}</div>
                    </div>
                    <div className="py-0.5 flex justify-start items-center gap-2.5">
                        <CaretDownSvg height="20" width="20" color="#000" />
                    </div>
                </div>
                <div className="justify-start text-gray-20 text-xxs font-normal">out of {total}</div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
                <div
                    className={`h-10 w-10 bg-gray-bg rounded-full inline-flex justify-center items-center gap-0.5 ${page > 1 ? "cursor-pointer" : "opacity-50"
                        }`}
                    onClick={handlePrevious}
                >
                    <CaretLeftSvg height="20" width="20" color="#000" />
                </div>

                {renderPageNumbers()}

                <div
                    className={`h-10 w-10 bg-gray-bg rounded-full inline-flex justify-center items-center gap-0.5 ${page < totalPages ? "cursor-pointer" : "opacity-50"
                        }`}
                    onClick={handleNext}
                >
                    <CaretRightSvg height="20" width="20" color="#000" />
                </div>
            </div>
        </div>
    )
}

export default Pagination

