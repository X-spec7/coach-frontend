"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import WorkoutCard from "./WorkoutCard"
import type { Workout } from "../types/workout.dto"
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi"

interface WorkoutListProps {
    workouts: Workout[]
    onCreateWorkout: () => void
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onCreateWorkout }) => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [showFilters, setShowFilters] = useState(false)

    // Extract unique categories
    const categories = Array.from(new Set(workouts.map((workout) => workout.category)))

    // Filter workouts based on search and category
    const filteredWorkouts = workouts.filter((workout) => {
        const matchesSearch =
            workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workout.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory ? workout.category === selectedCategory : true
        return matchesSearch && matchesCategory
    })

    const handleWorkoutClick = (workoutId: string) => {
        router.push(`/workouts/${workoutId}`)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Workouts</h2>
                <button
                    onClick={onCreateWorkout}
                    className="flex items-center gap-2 bg-green text-black px-4 py-2 rounded-full hover:bg-green-dark transition-colors"
                >
                    <FiPlus size={18} />
                    <span>Create Workout</span>
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search workouts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <FiFilter size={18} />
                        <span>{selectedCategory || "All Categories"}</span>
                    </button>

                    {showFilters && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                            <button
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${!selectedCategory ? "bg-green-50 text-green-700" : ""}`}
                                onClick={() => {
                                    setSelectedCategory(null)
                                    setShowFilters(false)
                                }}
                            >
                                All Categories
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedCategory === category ? "bg-green-50 text-green-700" : ""}`}
                                    onClick={() => {
                                        setSelectedCategory(category)
                                        setShowFilters(false)
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {filteredWorkouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} onClick={() => handleWorkoutClick(workout.id)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">No workouts found</p>
                    <button
                        onClick={onCreateWorkout}
                        className="bg-green text-black px-4 py-2 rounded-full hover:bg-green-dark transition-colors"
                    >
                        Create Your First Workout
                    </button>
                </div>
            )}
        </div>
    )
}

export default WorkoutList

