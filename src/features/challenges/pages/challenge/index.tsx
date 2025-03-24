"use client"

import type React from "react"
import { useState, useEffect } from "react"
import ChallengeSearch from "../../components/ChallengeSearch"
import ChallengeList from "../../components/ChallengeList"
import Pagination from "../../components/Pagination"
import { ChallengeFilter, ChallengeResponse } from "../../types"
import { ChallengeService } from "../../services"

const ChallengesPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [challengeData, setChallengeData] = useState<ChallengeResponse>({
        challenges: [],
        pagination: {
            page: 1,
            limit: 12,
            total: 0,
        },
    })
    const [filters, setFilters] = useState<ChallengeFilter>({})

    useEffect(() => {
        fetchChallenges()
    }, [filters, challengeData.pagination.page, challengeData.pagination.limit])

    const fetchChallenges = async () => {
        setLoading(true)
        try {
            const response = await ChallengeService.getChallenges(filters, {
                page: challengeData.pagination.page,
                limit: challengeData.pagination.limit,
            })
            setChallengeData(response)
        } catch (error) {
            console.error("Error fetching challenges:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleFilterChange = (newFilters: ChallengeFilter) => {
        setFilters(newFilters)
        // Reset to page 1 when filters change
        setChallengeData((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: 1,
            },
        }))
    }

    const handlePageChange = (page: number) => {
        setChallengeData((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page,
            },
        }))
    }

    const handleLimitChange = (limit: number) => {
        setChallengeData((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: 1, // Reset to page 1 when limit changes
                limit,
            },
        }))
    }

    return (
        <div className="bg-white rounded-4xl p-6">
            <ChallengeSearch onFilterChange={handleFilterChange} />

            {loading ? (
                "Loading..."
            ) : (
                <>
                    <ChallengeList challenges={challengeData.challenges} />

                    <Pagination
                        pagination={challengeData.pagination}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />
                </>
            )}
        </div>
    )
}

export default ChallengesPage

