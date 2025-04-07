import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import CreateWorkoutPage from "@/features/workout/pages/create"

export const metadata: Metadata = {
    title: "Create Workout | COA-CH",
    description: "Create a new workout routine",
}

const CreateWorkout: React.FC = () => {
    return (
        <SharedLayout headerTitle="Create Workout" headerDescription="Design a new workout routine">
            <CreateWorkoutPage />
        </SharedLayout>
    )
}

export default CreateWorkout

