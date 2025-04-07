"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import WorkoutForm from "../../components/WorkoutForm"
import type { Workout } from "../../types/workout.dto"
import { WorkoutService } from "../../services/workout.service"

interface EditWorkoutPageProps {
    id: string
}

const EditWorkoutPage: React.FC<EditWorkoutPageProps> = ({ id }) => {
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

    const handleSave = async (updatedWorkout: Workout) => {
        try {
            await WorkoutService.updateWorkout(id, updatedWorkout)
            router.push(`/workouts/${id}`)
        } catch (error) {
            console.error("Error updating workout:", error)
            alert("There was an error updating the workout. Please try again.")
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
                <p className="mt-2 text-gray-600">The workout you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <button className="mt-4 px-4 py-2 bg-green text-black rounded-lg" onClick={() => router.push("/workouts")}>
                    Back to Workouts
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-6">
            <WorkoutForm initialData={workout} onSave={handleSave} />
        </div>
    )
}

export default EditWorkoutPage

