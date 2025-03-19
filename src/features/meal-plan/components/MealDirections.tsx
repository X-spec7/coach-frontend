import type React from "react"
import type { MealStep } from "../types/class.dto"

interface MealDirectionsProps {
    steps: MealStep[]
}

const MealDirections: React.FC<MealDirectionsProps> = ({ steps }) => {
    return (
        <div className="mb-6">
            <h2 className="text-base font-medium mb-4">Directions</h2>
            <div className="space-y-6">
                {steps.map((step) => (
                    <div key={step.id} className="flex gap-3">
                        <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">
                            {step.id}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-medium">
                                {step.title}
                            </h4>
                            <p className="text-sm text-gray-700">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MealDirections

