import type React from "react"

interface HealthScoreBarProps {
    score: number
}

const HealthScoreBar: React.FC<HealthScoreBarProps> = ({ score }) => {
    const filledBars = Math.round((score / 100) * 20)

    return (
        <div className="flex flex-col gap-2">
            <p className="text-gray-20 text-sm flex items-center gap-1">
                Health Score:
                <div className="flex items-center">
                    <span className="text-black font-bold">{score}</span>
                    <span>/100</span>
                </div>
            </p>
            <div className="flex items-center">
                <div className="flex items-center h-4 gap-1">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div
                            key={index}
                            className={`flex-1 self-stretch ${index < filledBars ? "bg-blue" : "bg-stroke"} rounded w-2`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HealthScoreBar

