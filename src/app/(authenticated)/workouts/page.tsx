import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import WorkoutsPage from "@/features/workout/pages"

export const metadata: Metadata = {
    title: "Workouts | COA-CH",
    description: "Manage your workout routines",
}

const WorkoutsPageWrapper: React.FC = () => {
    return (
        <SharedLayout headerTitle="Workouts" headerDescription="Manage your workout routines">
            <WorkoutsPage />
        </SharedLayout>
    )
}

export default WorkoutsPageWrapper

