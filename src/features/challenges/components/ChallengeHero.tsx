"use client"

import type React from "react"
import Image from "next/image"
import { FiUsers } from "react-icons/fi"
import { CiClock2 } from "react-icons/ci"
import StatusBadge from "./ui/StatusBadge"
import ActionButton from "./ui/ActionButton"
import type { Challenge } from "../types"

interface ChallengeHeroProps {
    challenge: Challenge
    isJoined: boolean
    onJoin: () => void
    onLeave: () => void
}

const ChallengeHero: React.FC<ChallengeHeroProps> = ({ challenge, isJoined, onJoin, onLeave }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
                <div className="rounded-xl overflow-hidden">
                    <Image
                        src={challenge.image || "/images/work-out.png"}
                        alt={challenge.title}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
            <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                    <StatusBadge status={challenge.status} />
                    <span className="text-gray-500 text-sm">{challenge.goal.type} Challenge</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-1">
                        <FiUsers size={16} className="text-gray-500" />
                        <span className="text-sm">{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CiClock2 size={16} className="text-gray-500" />
                        <span className="text-sm">Ends on {challenge.endDate}</span>
                    </div>
                </div>
                {isJoined ? (
                    <ActionButton variant="danger" onClick={onLeave}>
                        Leave Challenge
                    </ActionButton>
                ) : (
                    <ActionButton variant="primary" onClick={onJoin}>
                        Join Challenge
                    </ActionButton>
                )}
            </div>
        </div>
    )
}

export default ChallengeHero

