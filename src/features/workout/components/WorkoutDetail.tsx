"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import ExerciseCard from "./ExerciseCard"
import type { Workout } from "../types/workout.dto"
import { FiArrowLeft, FiBarChart, FiCalendar, FiClock, FiEdit, FiPlay, FiShare, FiTrash } from "react-icons/fi"

interface WorkoutDetailProps {
    workout: Workout
    onEdit: () => void
    onDelete: () => void
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ workout, onEdit, onDelete }) => {
    const router = useRouter()
    const [showActions, setShowActions] = useState(false)

    // Calculate total duration
    const calculateDuration = () => {
        let totalMinutes = 0
        workout.exercises.forEach((exercise) => {
            // Estimate time per set (including rest)
            const timePerSet = exercise.restSeconds / 60 + 1 // 1 minute per set + rest time
            totalMinutes += timePerSet * exercise.sets
        })
        return Math.max(Math.round(totalMinutes), 5) // Minimum 5 minutes
    }

    const handleStartWorkout = () => {
        router.push(`/workouts/${workout.id}/start`)
    }

    const handleBack = () => {
        router.back()
    }

    const handleShare = () => {
        // In a real app, implement sharing functionality
        alert("Sharing functionality would be implemented here")
    }

    const confirmDelete = () => {
        if (confirm("Are you sure you want to delete this workout?")) {
            onDelete()
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <FiArrowLeft size={20} />
                    <span>Back to Workouts</span>
                </button>

                <div className="relative">
                    <button onClick={() => setShowActions(!showActions)} className="p-2 rounded-full hover:bg-gray-100" title="Actions">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                        </svg>
                    </button>

                    {showActions && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                            <button
                                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => {
                                    setShowActions(false)
                                    onEdit()
                                }}
                            >
                                <FiEdit size={16} className="mr-2" />
                                Edit Workout
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => {
                                    setShowActions(false)
                                    handleShare()
                                }}
                            >
                                <FiShare size={16} className="mr-2" />
                                Share Workout
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                                onClick={() => {
                                    setShowActions(false)
                                    confirmDelete()
                                }}
                            >
                                <FiTrash size={16} className="mr-2" />
                                Delete Workout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="relative h-64 w-full bg-gray-100">
                    {workout.image ? (
                        <Image src={workout.image || "/placeholder.svg"} alt={workout.name} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-green-50">
                            <span className="text-green-600 font-bold text-4xl">{workout.name.charAt(0)}</span>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                        {workout.category}
                    </div>
                </div>

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-2">{workout.name}</h1>
                    <p className="text-gray-600 mb-4">{workout.description}</p>

                    <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex items-center gap-2">
                            <FiBarChart size={20} className="text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Exercises</p>
                                <p className="font-medium">{workout.exercises.length}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiClock size={20} className="text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-medium">{calculateDuration()} min</p>
                            </div>
                        </div>

                        {workout.lastPerformed && (
                            <div className="flex items-center gap-2">
                                <FiCalendar size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Last Performed</p>
                                    <p className="font-medium">{workout.lastPerformed}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleStartWorkout}
                        className="w-full flex items-center justify-center gap-2 bg-green text-black py-3 rounded-lg hover:bg-green-dark transition-colors"
                    >
                        <FiPlay size={20} fill="currentColor" />
                        <span className="font-medium">Start Workout</span>
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Exercises</h2>

                {workout.exercises.map((exercise, index) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
                ))}
            </div>
        </div>
    )
}

export default WorkoutDetail

