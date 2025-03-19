import type React from "react"
import { LuDot } from "react-icons/lu"

interface MealNotesProps {
    notes: string[]
}

const MealNotes: React.FC<MealNotesProps> = ({ notes }) => {

    return (
        <div className="border-t-2 border-gray-bg mx-4 mb-6">
            <div className="flex justify-between items-center py-4 cursor-pointer">
                <h2 className="text-base font-medium">Notes</h2>
            </div>

            <div className="py-4 pt-0">
                <ul className="space-y-3">
                    {notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <span className="bg-blue h-5 w-5 rounded-full flex items-center justify-center">
                                <LuDot color="#000" size="20" />
                            </span>
                            <span className="text-sm text-gray-700">{note}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default MealNotes

