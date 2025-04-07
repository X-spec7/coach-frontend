"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import WorkoutForm from "../../components/WorkoutForm"
import type { Workout } from "../../types/workout.dto"
import { WorkoutService } from "../../services/workout.service"

const CreateWorkoutPage: React.FC = () => {
    const router = useRouter()

    const handleSave = async (workout: Workout) => {
        try {
            const { id, createdAt, updatedAt, ...workoutData } = workout
            await WorkoutService.createWorkout(workoutData)
            router.push("/workouts")
        } catch (error) {
            console.error("Error creating workout:", error)
            alert("There was an error creating the workout. Please try again.")
        }
    }

    return (
        <div className="bg-white rounded-xl p-6">
            <WorkoutForm onSave={handleSave} />
        </div>
    )
}

export default CreateWorkoutPage

