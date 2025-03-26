import type React from "react"
import type { Metadata } from "next"
import SharedLayout from "@/shared/Layouts/SharedLayout"
import ClientsPage from "@/features/clients/pages"

export const metadata: Metadata = {
    title: "Clients | COA-CH",
    description: "Manage your clients",
}

const ClientsPageWrapper: React.FC = () => {
    return (
        <SharedLayout headerTitle="Clients" headerDescription="Manage your clients">
            <ClientsPage />
        </SharedLayout>
    )
}

export default ClientsPageWrapper

