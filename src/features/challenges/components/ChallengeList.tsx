"use client"

import type React from "react"
import ChallengeCard from "./ChallengeCard"
import { Challenge } from "../types"

interface ChallengeListProps {
    challenges: Challenge[]
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
    return (
        <div className="grid grid-cols-2 items-center justify-between gap-5 mt-6">
            {challenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
        </div>
    )
}

export default ChallengeList

