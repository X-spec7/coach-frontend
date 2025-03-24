"use client"

import type React from "react"
import { FiArrowLeft, FiShare2 } from "react-icons/fi"

interface PageHeaderProps {
    onBack: () => void
    onShare?: () => void
}

const PageHeader: React.FC<PageHeaderProps> = ({ onBack, onShare }) => {
    const handleShare = () => {
        if (onShare) {
            onShare()
        } else {
            // Default share behavior
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href,
                })
            } else {
                // Fallback for browsers that don't support the Web Share API
                navigator.clipboard.writeText(window.location.href)
                alert("Link copied to clipboard!")
            }
        }
    }

    return (
        <div className="flex items-center justify-between mb-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900" onClick={onBack}>
                <FiArrowLeft size={20} />
                <span>Back to Challenges</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900" onClick={handleShare}>
                <FiShare2 size={20} />
                <span>Share</span>
            </button>
        </div>
    )
}

export default PageHeader

