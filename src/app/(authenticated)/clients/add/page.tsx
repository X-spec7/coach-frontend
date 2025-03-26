import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import AddClientPage from "@/features/clients/pages/add"

export const metadata: Metadata = {
    title: "Add Client | COA-CH",
    description: "Add a new client",
}

const AddClientPageWrapper: React.FC = () => {
    return (
        <SharedLayout headerTitle="Add Client" headerDescription="Create a new client profile">
            <AddClientPage />
        </SharedLayout>
    )
}

export default AddClientPageWrapper

