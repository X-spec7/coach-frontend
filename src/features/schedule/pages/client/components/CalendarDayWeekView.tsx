"use client"

import React from "react"
import cn from "classnames"
import { format, isSameDay } from "date-fns"
import type { ClassData, ClassCategory } from "../../../types/class.dto"

interface CalendarDayWeekViewProps {
    days: Date[]
    timeSlots: string[]
    getClassesForTimeAndDay: (time: string, day: Date) => ClassData[]
    getCategoryById: (categoryId: string) => ClassCategory
    handleClassClick: (classData: ClassData) => void
}

const CalendarDayWeekView: React.FC<CalendarDayWeekViewProps> = ({
    days,
    timeSlots,
    getClassesForTimeAndDay,
    getCategoryById,
    handleClassClick,
}) => {
    return (
        <>
            {timeSlots.map((time) => (
                <React.Fragment key={time}>
                    <div className="bg-white h-26 p-2 text-xs">{time}</div>
                    {days.map((day) => {
                        const slotClasses = getClassesForTimeAndDay(time, day)
                        return (
                            <div
                                key={`${time}-${format(day, "yyyy-MM-dd")}`}
                                className={cn(
                                    "bg-white border-l border-gray-200 relative h-26",
                                    isSameDay(day, new Date()) && "bg-blue-50",
                                )}
                            >
                                {slotClasses.map((classData) => {
                                    const category = getCategoryById(classData.categoryId)
                                    return (
                                        <div
                                            key={classData.id}
                                            className={cn(
                                                "absolute inset-x-1 top-1/2 transform -translate-y-1/2 p-2 rounded z-10",
                                                category.bgColor,
                                                `cursor-pointer hover:ring-2 hover:ring-offset-1 transition-all hover:ring-${category.bgColor.replace("bg-", "")}`,
                                            )}
                                            onClick={() => handleClassClick(classData)}
                                        >
                                            <div className="flex flex-col gap-3">
                                                {category.icon}
                                                <span className="font-medium text-sm">{classData.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs mt-3">
                                                <span className="text-gray-700">{classData.time}</span>
                                                <span>•</span>
                                                <span className="text-gray-700">{classData.trainer}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </React.Fragment>
            ))}
        </>
    )
}

export default CalendarDayWeekView
