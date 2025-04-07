"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ExerciseCard from "./ExerciseCard"
import ExerciseForm from "./ExerciseForm"
import type { Workout, Exercise } from "../types/workout.dto"
import { FiArrowLeft, FiPlus } from "react-icons/fi"

interface WorkoutFormProps {
    initialData?: Partial<Workout>
    onSave: (workout: Workout) => void
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ initialData, onSave }) => {
    const router = useRouter()
    const [workout, setWorkout] = useState<Partial<Workout>>({
        id: initialData?.id || crypto.randomUUID(),
        name: initialData?.name || "",
        description: initialData?.description || "",
        category: initialData?.category || "Strength",
        image: initialData?.image || "",
        exercises: initialData?.exercises || [],
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [showExerciseForm, setShowExerciseForm] = useState(false)
    const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)

    const categories = [
        "Strength",
        "Cardio",
        "HIIT",
        "Yoga",
        "Flexibility",
        "Bodyweight",
        "Powerlifting",
        "CrossFit",
        "Custom",
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }

        setWorkout((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddExercise = () => {
        setEditingExercise(null)
        setShowExerciseForm(true)
    }

    const handleEditExercise = (exercise: Exercise) => {
        setEditingExercise(exercise)
        setShowExerciseForm(true)
    }

    const handleDeleteExercise = (exerciseId: string) => {
        if (confirm("Are you sure you want to remove this exercise?")) {
            setWorkout((prev) => ({
                ...prev,
                exercises: prev.exercises?.filter((ex) => ex.id !== exerciseId) || [],
            }))
        }
    }

    const handleSaveExercise = (exercise: Exercise) => {
        if (editingExercise) {
            // Update existing exercise
            setWorkout((prev) => ({
                ...prev,
                exercises: prev.exercises?.map((ex) => (ex.id === exercise.id ? exercise : ex)) || [],
            }))
        } else {
            // Add new exercise
            setWorkout((prev) => ({
                ...prev,
                exercises: [...(prev.exercises || []), exercise],
            }))
        }

        setShowExerciseForm(false)
        setEditingExercise(null)
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!workout.name?.trim()) {
            newErrors.name = "Workout name is required"
        }

        if (!workout.category) {
            newErrors.category = "Category is required"
        }

        if (!workout.exercises?.length) {
            newErrors.exercises = "At least one exercise is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            onSave(workout as Workout)
        }
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <FiArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <h1 className="text-2xl font-bold ml-4">{initialData?.id ? "Edit Workout" : "Create Workout"}</h1>
            </div>

            {showExerciseForm ? (
                <ExerciseForm
                    initialData={editingExercise || undefined}
                    onSave={handleSaveExercise}
                    onCancel={() => {
                        setShowExerciseForm(false)
                        setEditingExercise(null)
                    }}
                />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-medium mb-4">Workout Details</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Workout Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={workout.name}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={workout.category}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={workout.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Describe your workout..."
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL (optional)
                                </label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={workout.image}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Exercises</h2>
                            <button
                                type="button"
                                onClick={handleAddExercise}
                                className="flex items-center gap-2 px-3 py-1 bg-green text-black rounded-full hover:bg-green-dark transition-colors"
                            >
                                <FiPlus size={16} />
                                <span>Add Exercise</span>
                            </button>
                        </div>

                        {workout.exercises && workout.exercises.length > 0 ? (
                            <div>
                                {workout.exercises.map((exercise, index) => (
                                    <ExerciseCard
                                        key={exercise.id}
                                        exercise={exercise}
                                        index={index}
                                        onEdit={handleEditExercise}
                                        onDelete={handleDeleteExercise}
                                        isEditable={true}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 mb-4">No exercises added yet</p>
                                <button
                                    type="button"
                                    onClick={handleAddExercise}
                                    className="px-4 py-2 bg-green text-black rounded-full hover:bg-green-dark transition-colors"
                                >
                                    Add Your First Exercise
                                </button>
                            </div>
                        )}

                        {errors.exercises && <p className="mt-2 text-sm text-red-600">{errors.exercises}</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-3 bg-green text-black rounded-md hover:bg-green-dark">
                            {initialData?.id ? "Update Workout" : "Create Workout"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default WorkoutForm

