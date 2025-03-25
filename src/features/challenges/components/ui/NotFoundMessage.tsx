"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import ActionButton from "./ActionButton"

interface NotFoundMessageProps {
    title?: string
    message?: string
    buttonText?: string
    redirectPath?: string
}

const NotFoundMessage: React.FC<NotFoundMessageProps> = ({
    title = "Challenge not found",
    message = "The challenge you're looking for doesn't exist or has been removed.",
    buttonText = "Back to Challenges",
    redirectPath = "/challenges",
}) => {
    const router = useRouter()

    return (
        <div className="text-center py-8">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <ActionButton variant="primary" className="mt-4" onClick={() => router.push(redirectPath)}>
                {buttonText}
            </ActionButton>
        </div>
    )
}

export default NotFoundMessage

