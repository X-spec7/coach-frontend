import type React from "react"
import Image from "next/image"
import { LeaderboardEntry } from "../types"

interface LeaderboardProps {
    entries: LeaderboardEntry[]
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
    return (
        <div className="bg-gray-bg rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
            <div className="space-y-4">
                {entries.map((entry) => (
                    <div key={entry.position} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-medium">
                                {entry.position}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                                    <Image
                                        src={entry.avatar || "/images/work-out.png"}
                                        alt={`${entry.name} avatar`}
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">{entry.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {entry.amount} {entry.unit}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm font-medium">{entry.progress}%</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Leaderboard

