"use client"

import type React from "react"
import Image from "next/image"
import { FiUsers } from "react-icons/fi"
import { CiClock2 } from "react-icons/ci"
import { useRouter } from "next/navigation"
import { Challenge } from "../types"

interface ChallengeCardProps {
    challenge: Challenge
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/challenges/${challenge.id}`)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-500"
            case "completed":
                return "bg-blue-500"
            case "upcoming":
                return "bg-yellow-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <div
            className="items-center bg-gray-bg rounded-md overflow-hidden w-full grid-cols-3 grid gap-4 cursor-pointer hover:shadow-md transition-shadow h-full"
            onClick={handleClick}
        >
            {/* Left Card */}
            <div className="col-span-1 rounded-md h-full flex flex-col">
                <Image
                    className="w-full object-cover h-full"
                    src={challenge.image || "/images/work-out.png"}
                    alt={challenge.title}
                    width={134}
                    height={103}
                />
                <div className="w-full bg-green flex justify-center items-center">
                    <span className="text-gray-30 text-lg font-bold leading-tight">{challenge.organization}</span>
                </div>
            </div>

            {/* Right Content */}
            <div className="col-span-2 p-4 space-y-4">
                <div className="flex items-center space-x-2">
                    <div className={`w-2.5 h-2.5 ${getStatusColor(challenge.status)} rounded-full`}></div>
                    <span className="text-gray-20 text-sm font-medium capitalize">{challenge.status}</span>
                </div>
                <h2 className="text-gray-30 text-[22px] font-bold">{challenge.title}</h2>
                <p className="text-gray-30 text-sm">{challenge.description}</p>
                <div className="flex space-x-3">
                    <div className="flex items-center space-x-1">
                        <FiUsers size={14} color="#878A94" />
                        <span className="text-gray-20 text-xs font-medium">{challenge.participants}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <CiClock2 size={14} color="#878A94" />
                        <span className="text-gray-20 text-xs font-medium">Ends on {challenge.endDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChallengeCard

