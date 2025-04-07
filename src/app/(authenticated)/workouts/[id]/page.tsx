import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import WorkoutDetailPage from "@/features/workout/pages/detail"

export const metadata: Metadata = {
    title: "Workout Details | COA-CH",
    description: "View workout details",
}

interface WorkoutDetailProps {
    params: {
        id: string
    }
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ params }) => {
    return (
        <SharedLayout headerTitle="Workout Details" headerDescription="View workout information">
            <WorkoutDetailPage id={params.id} />
        </SharedLayout>
    )
}

export default WorkoutDetail

