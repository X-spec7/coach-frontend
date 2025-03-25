"use client"

import type React from "react"
import Image from "next/image"
import { FiUsers } from "react-icons/fi"
import { CiClock2 } from "react-icons/ci"
import { useRouter } from "next/navigation"
import { RelatedChallengeProps } from "../types"


interface RelatedChallengesProps {
    challenges: RelatedChallengeProps[]
}

const RelatedChallenges: React.FC<RelatedChallengesProps> = ({ challenges }) => {
    const router = useRouter()

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Related Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((challenge) => (
                    <div
                        key={challenge.id}
                        className="flex gap-4 p-4 bg-gray-bg-subtle rounded-xl cursor-pointer hover:bg-gray-bg"
                        onClick={() => router.push(`/challenges/${challenge.id}`)}
                    >
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                            <Image
                                src={challenge.image || "/images/work-out.png"}
                                alt={challenge.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium">{challenge.title}</h3>
                            <p className="text-sm text-gray-500">
                                {challenge.type}, {challenge.frequency}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                    <FiUsers size={12} className="text-gray-500" />
                                    <span className="text-xs text-gray-500">{challenge.participants}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CiClock2 size={12} className="text-gray-500" />
                                    <span className="text-xs text-gray-500">Ends on {challenge.endDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedChallenges

