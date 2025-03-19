import type React from "react"
import type { MealTool } from "../types/class.dto"
import { LuDot } from "react-icons/lu"

interface MealToolsProps {
    tools: MealTool[]
}

const MealTools: React.FC<MealToolsProps> = ({ tools }) => {
    return (
        <div className="mb-6 mx-4">
            <h2 className="text-base font-medium mb-4">Tools and Equipments</h2>
            <ul className="space-y-2">
                {tools.map((tool, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span className="bg-blue h-5 w-5 rounded-full flex items-center justify-center">
                            <LuDot color="#000" size="20" />
                        </span>
                        <span className="text-sm text-gray-30">{tool.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MealTools

