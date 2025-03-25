"use client"

import type React from "react"
import ActionButton from "./ui/ActionButton"

interface ProgressTrackerProps {
    isJoined: boolean
    userProgress: number
    goalAmount: number
    goalUnit: string
    onJoin: () => void
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ isJoined, userProgress, goalAmount, goalUnit, onJoin }) => {
    const currentAmount = Math.floor(goalAmount * (userProgress / 100))

    return (
        <div className="bg-gray-bg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            {isJoined ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Completion</span>
                        <span className="font-medium">{userProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green h-2.5 rounded-full" style={{ width: `${userProgress}%` }}></div>
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-between text-sm">
                            <span>
                                Current: {currentAmount} {goalUnit}
                            </span>
                            <span>
                                Goal: {goalAmount} {goalUnit}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-4">
                    <p className="text-gray-500 mb-4">Join this challenge to track your progress</p>
                    <ActionButton variant="primary" onClick={onJoin}>
                        Join Challenge
                    </ActionButton>
                </div>
            )}
        </div>
    )
}

export default ProgressTracker

