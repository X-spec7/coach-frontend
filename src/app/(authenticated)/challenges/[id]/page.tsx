import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import ChallengeDetailPage from "@/features/challenges/pages/challenge-detail"

export const metadata: Metadata = {
    title: "Challenge Details | COA-CH",
    description: "View challenge details and progress",
}

interface ChallengeDetailProps {
    params: {
        id: string
    }
}

const ChallengeDetail: React.FC<ChallengeDetailProps> = ({ params }) => {
    return (
        <SharedLayout headerTitle="Challenge Details" headerDescription="">
            <ChallengeDetailPage id={params.id} />
        </SharedLayout>
    )
}

export default ChallengeDetail

