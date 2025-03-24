import type React from "react"
import type { Challenge } from "../types"

interface ChallengeDetailsProps {
    challenge: Challenge
}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = ({ challenge }) => {
    return (
        <div className="bg-gray-bg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Challenge Details</h2>
            <div className="space-y-4">
                <DetailItem label="Goal" value={`${challenge.goal.amount.toLocaleString()} ${challenge.goal.unit}`} />
                <DetailItem label="Frequency" value={challenge.goal.frequency} capitalize />
                <DetailItem label="Organization" value={challenge.organization} />
                <DetailItem label="Start Date" value={new Date(challenge.createdAt).toLocaleDateString()} />
                <DetailItem label="End Date" value={challenge.endDate} />
            </div>
        </div>
    )
}

interface DetailItemProps {
    label: string
    value: string
    capitalize?: boolean
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, capitalize = false }) => {
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <p className={`text-lg ${capitalize ? "capitalize" : ""}`}>{value}</p>
        </div>
    )
}

export default ChallengeDetails

