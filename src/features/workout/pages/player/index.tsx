"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import WorkoutPlayer from "../../components/WorkoutPlayer"
import type { Workout } from "../../types/workout.dto"
import { WorkoutService } from "../../services/workout.service"

interface WorkoutPlayerPageProps {
    id: string
}

const WorkoutPlayerPage: React.FC<WorkoutPlayerPageProps> = ({ id }) => {
    const router = useRouter()
    const [workout, setWorkout] = useState<Workout | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWorkout = async () => {
            setLoading(true)
            try {
                const data = await WorkoutService.getWorkoutById(id)
                if (data) {
                    setWorkout(data)
                } else {
                    // Handle not found
                    router.push("/workouts")
                }
            } catch (error) {
                console.error("Error fetching workout:", error)
                router.push("/workouts")
            } finally {
                setLoading(false)
            }
        }

        fetchWorkout()
    }, [id, router])

    const handleComplete = async () => {
        try {
            await WorkoutService.recordWorkoutCompletion(id)
            router.push(`/workouts/${id}`)
        } catch (error) {
            console.error("Error recording workout completion:", error)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        )
    }

    if (!workout) {
        return (
            <div className="text-center py-8">
                <h2 className="text-xl font-semibold">Workout not found</h2>
                <p className="mt-2 text-gray-600">The workout you&#39;re looking for doesn&#39;t exist or has been removed.</p>
                <button className="mt-4 px-4 py-2 bg-green text-black rounded-lg" onClick={() => router.push("/workouts")}>
                    Back to Workouts
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-6">
            <WorkoutPlayer workout={workout} onComplete={handleComplete} />
        </div>
    )
}

export default WorkoutPlayerPage

