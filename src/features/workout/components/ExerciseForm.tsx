"use client"

import type React from "react"
import { useState } from "react"
import { FiX } from "react-icons/fi"
import type { Exercise } from "../types/workout.dto"

interface ExerciseFormProps {
    initialData?: Partial<Exercise>
    onSave: (exercise: Exercise) => void
    onCancel: () => void
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ initialData, onSave, onCancel }) => {
    const [exercise, setExercise] = useState<Partial<Exercise>>({
        id: initialData?.id || crypto.randomUUID(),
        name: initialData?.name || "",
        description: initialData?.description || "",
        sets: initialData?.sets || 3,
        reps: initialData?.reps || 10,
        weight: initialData?.weight || 0,
        weightUnit: initialData?.weightUnit || "kg",
        restSeconds: initialData?.restSeconds || 60,
        image: initialData?.image || "",
        notes: initialData?.notes || "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }

        // Handle numeric inputs
        if (type === "number") {
            setExercise((prev) => ({
                ...prev,
                [name]: value ? Number(value) : 0,
            }))
        } else {
            setExercise((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!exercise.name?.trim()) {
            newErrors.name = "Exercise name is required"
        }

        if (!exercise.sets || exercise.sets < 1) {
            newErrors.sets = "Sets must be at least 1"
        }

        if (!exercise.reps || exercise.reps < 1) {
            newErrors.reps = "Reps must be at least 1"
        }

        if (exercise.weight && exercise.weight < 0) {
            newErrors.weight = "Weight cannot be negative"
        }

        if (!exercise.restSeconds || exercise.restSeconds < 0) {
            newErrors.restSeconds = "Rest time cannot be negative"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            onSave(exercise as Exercise)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{initialData?.id ? "Edit Exercise" : "Add Exercise"}</h2>
                <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close">
                    <FiX size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Exercise Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={exercise.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={exercise.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="sets" className="block text-sm font-medium text-gray-700 mb-1">
                                Sets <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="sets"
                                name="sets"
                                value={exercise.sets}
                                onChange={handleChange}
                                min="1"
                                className={`w-full px-3 py-2 border ${errors.sets ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.sets && <p className="mt-1 text-sm text-red-600">{errors.sets}</p>}
                        </div>

                        <div>
                            <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-1">
                                Reps <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="reps"
                                name="reps"
                                value={exercise.reps}
                                onChange={handleChange}
                                min="1"
                                className={`w-full px-3 py-2 border ${errors.reps ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.reps && <p className="mt-1 text-sm text-red-600">{errors.reps}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (0 for bodyweight)
                            </label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={exercise.weight}
                                onChange={handleChange}
                                min="0"
                                step="0.5"
                                className={`w-full px-3 py-2 border ${errors.weight ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
                        </div>

                        <div>
                            <label htmlFor="weightUnit" className="block text-sm font-medium text-gray-700 mb-1">
                                Weight Unit
                            </label>
                            <select
                                id="weightUnit"
                                name="weightUnit"
                                value={exercise.weightUnit}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="kg">kg</option>
                                <option value="lbs">lbs</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="restSeconds" className="block text-sm font-medium text-gray-700 mb-1">
                            Rest Time (seconds) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="restSeconds"
                            name="restSeconds"
                            value={exercise.restSeconds}
                            onChange={handleChange}
                            min="0"
                            step="5"
                            className={`w-full px-3 py-2 border ${errors.restSeconds ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.restSeconds && <p className="mt-1 text-sm text-red-600">{errors.restSeconds}</p>}
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL (optional)
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={exercise.image}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                            Notes (optional)
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={exercise.notes}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Any special instructions or form cues"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-green text-black rounded-md hover:bg-green-dark">
                        {initialData?.id ? "Update Exercise" : "Add Exercise"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ExerciseForm

