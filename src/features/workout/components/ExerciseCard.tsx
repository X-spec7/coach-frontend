"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { FiChevronDown, FiChevronUp, FiClock, FiEdit, FiTrash2 } from "react-icons/fi"
import type { Exercise } from "../types/workout.dto"

interface ExerciseCardProps {
    exercise: Exercise
    index: number
    onEdit?: (exercise: Exercise) => void
    onDelete?: (exerciseId: string) => void
    isEditable?: boolean
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, index, onEdit, onDelete, isEditable = false }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-medium">
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-medium">{exercise.name}</h3>
                        <p className="text-sm text-gray-500">
                            {exercise.sets} sets • {exercise.reps} reps
                            {exercise.weight > 0 && ` • ${exercise.weight} ${exercise.weightUnit}`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {isEditable && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEdit && onEdit(exercise)
                                }}
                                className="p-1 hover:bg-gray-100 rounded-full"
                                aria-label="Edit exercise"
                            >
                                <FiEdit size={16} className="text-gray-500" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete && onDelete(exercise.id)
                                }}
                                className="p-1 hover:bg-gray-100 rounded-full"
                                aria-label="Delete exercise"
                            >
                                <FiTrash2 size={16} className="text-gray-500" />
                            </button>
                        </>
                    )}
                    {expanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </div>
            </div>

            {expanded && (
                <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        {exercise.image && (
                            <div className="w-full md:w-1/3 h-40 relative rounded-lg overflow-hidden">
                                <Image src={exercise.image || "/placeholder.svg"} alt={exercise.name} fill className="object-cover" />
                            </div>
                        )}

                        <div className="flex-1">
                            {exercise.description && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                                    <p className="text-sm text-gray-600">{exercise.description}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-500">Sets</p>
                                    <p className="font-medium">{exercise.sets}</p>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-500">Reps</p>
                                    <p className="font-medium">{exercise.reps}</p>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-500">Weight</p>
                                    <p className="font-medium">
                                        {exercise.weight > 0 ? `${exercise.weight} ${exercise.weightUnit}` : "Bodyweight"}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                                    <FiClock size={16} className="text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Rest</p>
                                        <p className="font-medium">{exercise.restSeconds}s</p>
                                    </div>
                                </div>
                            </div>

                            {exercise.notes && (
                                <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
                                    <h4 className="text-sm font-medium text-yellow-800 mb-1">Notes</h4>
                                    <p className="text-sm text-yellow-700">{exercise.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExerciseCard

