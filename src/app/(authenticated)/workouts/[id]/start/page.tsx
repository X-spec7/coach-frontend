import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import WorkoutPlayerPage from "@/features/workout/pages/player"

export const metadata: Metadata = {
    title: "Workout Session | COA-CH",
    description: "Active workout session",
}

interface WorkoutPlayerProps {
    params: {
        id: string
    }
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ params }) => {
    return (
        <SharedLayout headerTitle="Workout Session" headerDescription="Follow your workout routine">
            <WorkoutPlayerPage id={params.id} />
        </SharedLayout>
    )
}

export default WorkoutPlayer

