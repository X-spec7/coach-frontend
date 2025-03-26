import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import ClientDetailPage from "@/features/clients/pages/detail"

export const metadata: Metadata = {
    title: "Client Details | COA-CH",
    description: "View client details",
}

interface ClientDetailProps {
    params: {
        id: string
    }
}

const ClientDetail: React.FC<ClientDetailProps> = ({ params }) => {
    return (
        <SharedLayout headerTitle="Client Details" headerDescription="View client information">
            <ClientDetailPage id={params.id} />
        </SharedLayout>
    )
}

export default ClientDetail

