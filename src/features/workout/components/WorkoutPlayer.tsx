"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Workout } from "../types/workout.dto"
import { FiArrowLeft, FiCheckCircle, FiClock, FiPause, FiPlay, FiRotateCcw, FiSkipForward } from "react-icons/fi"

interface WorkoutPlayerProps {
    workout: Workout
    onComplete: () => void
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ workout, onComplete }) => {
    const router = useRouter()
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [currentSetIndex, setCurrentSetIndex] = useState(0)
    const [isResting, setIsResting] = useState(false)
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isWorkoutComplete, setIsWorkoutComplete] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const currentExercise = workout.exercises[currentExerciseIndex]
    const totalExercises = workout.exercises.length
    const totalSets = currentExercise?.sets || 0
    const progress = Math.round((currentExerciseIndex * 100 + (currentSetIndex / totalSets) * 100) / totalExercises)

    // Start/stop timer
    useEffect(() => {
        if (isActive && !isWorkoutComplete) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (isResting && prev <= 0) {
                        // Rest timer completed
                        setIsResting(false)
                        return 0
                    }
                    return prev > 0 ? prev - 1 : 0
                })
            }, 1000)
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isActive, isResting, isWorkoutComplete])

    // Handle set completion
    const completeSet = () => {
        if (currentSetIndex < totalSets - 1) {
            // Move to next set and start rest timer
            setCurrentSetIndex((prev) => prev + 1)
            setIsResting(true)
            setTimer(currentExercise.restSeconds)
            setIsActive(true)
        } else {
            // Move to next exercise
            if (currentExerciseIndex < totalExercises - 1) {
                setCurrentExerciseIndex((prev) => prev + 1)
                setCurrentSetIndex(0)
                setIsResting(false)
                setTimer(0)
                setIsActive(false)
            } else {
                // Workout complete
                setIsWorkoutComplete(true)
                setIsActive(false)
            }
        }
    }

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const handleBack = () => {
        if (confirm("Are you sure you want to exit this workout?")) {
            router.back()
        }
    }

    const toggleTimer = () => {
        setIsActive((prev) => !prev)
    }

    const resetTimer = () => {
        if (isResting) {
            setTimer(currentExercise.restSeconds)
        }
    }

    const skipRest = () => {
        if (isResting) {
            setIsResting(false)
            setTimer(0)
            setIsActive(false)
        }
    }

    const handleComplete = () => {
        onComplete()
    }

    return (
        <div className="max-w-4xl mx-auto">
            {isWorkoutComplete ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center min-h-[70vh] flex flex-col justify-center items-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle size={40} className="text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Workout Complete!</h1>
                    <p className="text-gray-600 mb-6">Great job! You&#39;ve completed the workout.</p>
                    <button
                        onClick={handleComplete}
                        className="px-6 py-3 bg-green text-black rounded-lg hover:bg-green-dark transition-colors"
                    >
                        Save & Continue
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                            <FiArrowLeft size={20} />
                            <span>Exit</span>
                        </button>
                        <div className="text-sm font-medium">
                            Exercise {currentExerciseIndex + 1}/{totalExercises}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="h-2 bg-gray-200">
                            <div className="h-full bg-green-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {currentExercise.image && (
                                    <div className="w-full md:w-1/3 h-48 relative rounded-lg overflow-hidden">
                                        <Image
                                            src={currentExercise.image || "/placeholder.svg"}
                                            alt={currentExercise.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold mb-2">{currentExercise.name}</h1>

                                    {isResting ? (
                                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                            <h2 className="text-lg font-medium text-blue-800 mb-2">Rest Time</h2>
                                            <div className="text-3xl font-bold text-blue-900 mb-2">{formatTime(timer)}</div>
                                            <p className="text-blue-700 text-sm">Rest before your next set</p>

                                            <div className="flex items-center gap-3 mt-4">
                                                <button
                                                    onClick={toggleTimer}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                                >
                                                    {isActive ? <FiPause size={20} /> : <FiPlay size={20} />}
                                                    <span>{isActive ? "Pause" : "Resume"}</span>
                                                </button>

                                                <button
                                                    onClick={resetTimer}
                                                    className="p-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                    title="Reset Timer"
                                                >
                                                    <FiRotateCcw size={20} />
                                                </button>

                                                <button
                                                    onClick={skipRest}
                                                    className="flex items-center gap-1 p-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                >
                                                    <FiSkipForward size={20} />
                                                    <span>Skip</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-6 mb-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Set</p>
                                                    <p className="text-xl font-bold">
                                                        {currentSetIndex + 1}/{totalSets}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">Reps</p>
                                                    <p className="text-xl font-bold">{currentExercise.reps}</p>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">Weight</p>
                                                    <p className="text-xl font-bold">
                                                        {currentExercise.weight > 0
                                                            ? `${currentExercise.weight} ${currentExercise.weightUnit}`
                                                            : "Bodyweight"}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <FiClock size={16} className="text-gray-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Rest</p>
                                                        <p className="font-medium">{currentExercise.restSeconds}s</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {currentExercise.description && (
                                                <div className="mb-4">
                                                    <p className="text-gray-600">{currentExercise.description}</p>
                                                </div>
                                            )}

                                            {currentExercise.notes && (
                                                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                                                    <h4 className="text-sm font-medium text-yellow-800 mb-1">Notes</h4>
                                                    <p className="text-sm text-yellow-700">{currentExercise.notes}</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {!isResting && (
                        <button
                            onClick={completeSet}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-green text-black rounded-lg hover:bg-green-dark transition-colors"
                        >
                            <FiCheckCircle size={20} />
                            <span className="font-medium">Complete Set</span>
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export default WorkoutPlayer

