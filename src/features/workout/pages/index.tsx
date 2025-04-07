"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import WorkoutList from "../components/WorkoutList"
import type { Workout } from "../types/workout.dto"
import { WorkoutService } from "../services/workout.service"

const WorkoutsPage: React.FC = () => {
    const router = useRouter()
    const [workouts, setWorkouts] = useState<Workout[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true)
            try {
                const data = await WorkoutService.getWorkouts()
                setWorkouts(data)
            } catch (error) {
                console.error("Error fetching workouts:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchWorkouts()
    }, [])

    const handleCreateWorkout = () => {
        router.push("/workouts/create")
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-6">
            <WorkoutList workouts={workouts} onCreateWorkout={handleCreateWorkout} />
        </div>
    )
}

export default WorkoutsPage

