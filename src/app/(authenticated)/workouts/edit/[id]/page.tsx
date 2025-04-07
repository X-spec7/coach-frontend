import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import EditWorkoutPage from "@/features/workout/pages/edit"

export const metadata: Metadata = {
    title: "Edit Workout | COA-CH",
    description: "Edit workout routine",
}

interface EditWorkoutProps {
    params: {
        id: string
    }
}

const EditWorkout: React.FC<EditWorkoutProps> = ({ params }) => {
    return (
        <SharedLayout headerTitle="Edit Workout" headerDescription="Modify your workout routine">
            <EditWorkoutPage id={params.id} />
        </SharedLayout>
    )
}

export default EditWorkout

