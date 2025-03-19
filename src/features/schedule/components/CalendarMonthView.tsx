"use client"

import type React from "react"
import cn from "classnames"
import { format, isSameDay, isWithinInterval, startOfMonth, endOfMonth } from "date-fns"
import type { ClassData, ClassCategory } from "../types/class.dto"

interface CalendarMonthViewProps {
    days: Date[]
    currentDate: Date
    filteredClasses: ClassData[]
    getCategoryById: (categoryId: string) => ClassCategory
    handleClassClick: (classData: ClassData) => void
}

const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({
    days,
    currentDate,
    filteredClasses,
    getCategoryById,
    handleClassClick,
}) => {
    return (
        <>
            {/* Day headers */}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName) => (
                <div key={dayName} className="bg-white p-2 text-xs font-medium text-center">
                    {dayName}
                </div>
            ))}

            {/* Calendar cells */}
            {days.map((day) => (
                <div
                    key={format(day, "yyyy-MM-dd")}
                    className={cn(
                        "bg-white border border-gray-100 min-h-[100px] p-1",
                        !isWithinInterval(day, {
                            start: startOfMonth(currentDate),
                            end: endOfMonth(currentDate),
                        }) && "bg-gray-50 text-gray-400",
                        isSameDay(day, new Date()) && "bg-blue-50",
                    )}
                >
                    <div className="text-right p-1">
                        <span
                            className={cn(
                                "inline-block w-6 h-6 rounded-full text-center leading-6 text-sm",
                                isSameDay(day, new Date()) && "bg-blue-500 text-white",
                            )}
                        >
                            {format(day, "d")}
                        </span>
                    </div>
                    <div className="space-y-1">
                        {filteredClasses
                            .filter((c) => c.day === format(day, "EEEE"))
                            .slice(0, 3)
                            .map((classItem) => {
                                const category = getCategoryById(classItem.categoryId)
                                return (
                                    <div
                                        key={classItem.id}
                                        className={cn("text-xs p-1 rounded truncate cursor-pointer", category.bgColor)}
                                        onClick={() => handleClassClick(classItem)}
                                    >
                                        {classItem.time} {classItem.name}
                                    </div>
                                )
                            })}
                        {filteredClasses.filter((c) => c.day === format(day, "EEEE")).length > 3 && (
                            <div className="text-xs text-center text-gray-500">
                                +{filteredClasses.filter((c) => c.day === format(day, "EEEE")).length - 3} more
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}

export default CalendarMonthView

