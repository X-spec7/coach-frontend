import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import EditClientPage from "@/features/clients/pages/edit"

export const metadata: Metadata = {
    title: "Edit Client | COA-CH",
    description: "Edit client information",
}

interface EditClientProps {
    params: {
        id: string
    }
}

const EditClientPageWrapper: React.FC<EditClientProps> = ({ params }) => {
    return (
        <SharedLayout headerTitle="Edit Client" headerDescription="Update client information">
            <EditClientPage id={params.id} />
        </SharedLayout>
    )
}

export default EditClientPageWrapper

