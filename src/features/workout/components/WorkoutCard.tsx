"use client"

import type React from "react"
import Image from "next/image"
import type { Workout } from "../types/workout.dto"
import { FiBarChart, FiCalendar, FiClock } from "react-icons/fi"

interface WorkoutCardProps {
    workout: Workout
    onClick: () => void
    className?: string
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onClick, className = "" }) => {
    // Calculate total exercises
    const totalExercises = workout.exercises.length

    // Calculate estimated duration in minutes
    const calculateDuration = () => {
        let totalMinutes = 0
        workout.exercises.forEach((exercise) => {
            // Estimate time per set (including rest)
            const timePerSet = exercise.restSeconds / 60 + 1 // 1 minute per set + rest time
            totalMinutes += timePerSet * exercise.sets
        })
        return Math.max(Math.round(totalMinutes), 5) // Minimum 5 minutes
    }

    return (
        <div
            className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden cursor-pointer ${className}`}
            onClick={onClick}
        >
            <div className="relative h-40 w-full bg-gray-100">
                {workout.image ? (
                    <Image src={workout.image || "/placeholder.svg"} alt={workout.name} fill className="object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-50">
                        <span className="text-green-600 font-semibold text-lg">{workout.name.charAt(0)}</span>
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium">
                    {workout.category}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{workout.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workout.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <FiBarChart size={16} />
                        <span>{totalExercises} exercises</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <FiClock size={16} />
                        <span>{calculateDuration()} min</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <FiCalendar size={16} />
                        <span>{workout.lastPerformed || "New"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutCard

