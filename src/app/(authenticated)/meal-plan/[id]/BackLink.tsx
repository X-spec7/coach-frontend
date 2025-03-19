"use client"

import { ArrowLeftSvg } from "@/shared/components/Svg"
import { useRouter } from "next/navigation"

function BackLink() {
    const router = useRouter()
    const onBack = () => {
        router.back()
    }
    return (
        <button onClick={onBack} className="flex items-center gap-2 text-gray-20 absolute left-2 top-1" title="Go back">
            <ArrowLeftSvg width='16' height='16' color='#878A94' />
            <p>Back to List Menu</p>
        </button>
    )
}
export default BackLink