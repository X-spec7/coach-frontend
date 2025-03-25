"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Challenge } from "../../types"
import { ChallengeService } from "../../services"
import type { LeaderboardEntry } from "../../types"

// Components
import PageHeader from "../../components/PageHeader"
import ChallengeHero from "../../components/ChallengeHero"
import ChallengeDetails from "../../components/ChallengeDetails"
import ProgressTracker from "../../components/ProgressTracker"
import Leaderboard from "../../components/Leaderboard"
import RelatedChallenges from "../../components/RelatedChallenges"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import NotFoundMessage from "../../components/ui/NotFoundMessage"

interface ChallengeDetailPageProps {
    id: string
}

const ChallengeDetailPage: React.FC<ChallengeDetailPageProps> = ({ id }) => {
    const router = useRouter()
    const [challenge, setChallenge] = useState<Challenge | null>(null)
    const [loading, setLoading] = useState(true)
    const [userProgress, setUserProgress] = useState(0)
    const [isJoined, setIsJoined] = useState(false)
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([])

    useEffect(() => {
        const fetchChallenge = async () => {
            setLoading(true)
            try {
                const data = await ChallengeService.getChallengeById(id)
                if (data) {
                    setChallenge(data)
                    // Simulate user progress (in a real app, this would come from the API)
                    setUserProgress(Math.floor(Math.random() * 100))
                    // Simulate whether user has joined (in a real app, this would come from the API)
                    setIsJoined(Math.random() > 0.5)

                    // Generate mock leaderboard data
                    const mockLeaderboard = [1, 2, 3].map((position) => ({
                        position,
                        name: `User Name ${position}`,
                        avatar: "/images/work-out.png",
                        progress: Math.floor(100 * (1 - position * 0.1)),
                        amount: Math.floor(data.goal.amount * (1 - position * 0.1)),
                        unit: data.goal.unit,
                    }))
                    setLeaderboardEntries(mockLeaderboard)
                } else {
                    // Handle not found
                    router.push("/challenges")
                }
            } catch (error) {
                console.error("Error fetching challenge:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchChallenge()
    }, [id, router])

    const handleBack = () => {
        router.back()
    }

    const handleJoinChallenge = () => {
        setIsJoined(true)
        // In a real app, this would call an API to join the challenge
    }

    const handleLeaveChallenge = () => {
        setIsJoined(false)
        // In a real app, this would call an API to leave the challenge
    }

    // Generate related challenges data
    const getRelatedChallenges = () => {
        if (!challenge) return []

        return [1, 2].map((i) => ({
            id: `${i + 1}`,
            title: `Similar Challenge ${i}`,
            type: challenge.goal.type,
            frequency: challenge.goal.frequency,
            participants: challenge.participants - 10 * i,
            endDate: challenge.endDate,
            image: "/images/work-out.png",
        }))
    }

    if (loading) {
        return (
            <div className="bg-white rounded-4xl p-6 flex justify-center items-center h-96">
                <LoadingSpinner size="md" />
            </div>
        )
    }

    if (!challenge) {
        return (
            <div className="bg-white rounded-4xl p-6">
                <NotFoundMessage />
            </div>
        )
    }

    return (
        <div className="bg-white rounded-4xl p-6">
            <PageHeader onBack={handleBack} />

            <ChallengeHero
                challenge={challenge}
                isJoined={isJoined}
                onJoin={handleJoinChallenge}
                onLeave={handleLeaveChallenge}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                    <ChallengeDetails challenge={challenge} />
                </div>
                <div className="md:col-span-1">
                    <ProgressTracker
                        isJoined={isJoined}
                        userProgress={userProgress}
                        goalAmount={challenge.goal.amount}
                        goalUnit={challenge.goal.unit}
                        onJoin={handleJoinChallenge}
                    />
                </div>
            </div>

            <Leaderboard entries={leaderboardEntries} />

            <RelatedChallenges challenges={getRelatedChallenges()} />
        </div>
    )
}

export default ChallengeDetailPage

