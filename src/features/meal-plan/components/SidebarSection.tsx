import type React from "react"
import type { ReactNode } from "react"
import DropdownDefault from "@/shared/components/Button/Dropdowns/DropdownDefault"

interface SidebarSectionProps {
    title: string
    children: ReactNode
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
    return (
        <div className="bg-white rounded-4xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
                <p className="text-black text-base">{title}</p>
                <DropdownDefault />
            </div>
            {children}
        </div>
    )
}

export default SidebarSection

