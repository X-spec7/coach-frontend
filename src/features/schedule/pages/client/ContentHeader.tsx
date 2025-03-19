import type { FC } from "react"
import { ClockSvg, FireSvg, MonitorSvg } from "@/shared/components/Svg"
import Card from "../../components/Card"

const ContentHeader: FC = () => {
    const handleOptionClick = (option: string) => {
        console.log(`Clicked: ${option}`)
    }

    const cards = [
        {
            icon: MonitorSvg,
            bgColor: "bg-blue",
            title: "Total Classes",
            value: "12",
            options: [
                { label: "View Details", action: () => handleOptionClick("View Details") },
                { label: "Edit", action: () => handleOptionClick("Edit") },
                { label: "Delete", action: () => handleOptionClick("Delete") },
            ],
        },
        {
            icon: ClockSvg,
            bgColor: "bg-yellow",
            title: "Total Hours",
            value: "10",
            unit: "hours",
            options: [
                { label: "History", action: () => handleOptionClick("History") },
                { label: "Reset", action: () => handleOptionClick("Reset") },
            ],
        },
        {
            icon: FireSvg,
            bgColor: "bg-green",
            title: "Calories Burned",
            value: "5,400",
            unit: "cal",
            options: [
                { label: "Burn Stats", action: () => handleOptionClick("Burn Stats") },
                { label: "Track", action: () => handleOptionClick("Track") },
            ],
        },
    ]

    return (
        <div className="flex justify-between items-center w-full p-4 gap-5">
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    )
}

export default ContentHeader

