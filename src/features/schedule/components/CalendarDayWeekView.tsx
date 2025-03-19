"use client"

import React from "react"
import cn from "classnames"
import { format, isSameDay, parse } from "date-fns"
import type { ClassData, ClassCategory } from "../types/class.dto"

interface CalendarDayWeekViewProps {
    days: Date[]
    timeSlots: string[]
    getCategoryById: (categoryId: string) => ClassCategory
    handleClassClick: (classData: ClassData) => void
    getAllClassesForDay: (day: Date) => ClassData[]
}

const CalendarDayWeekView: React.FC<CalendarDayWeekViewProps> = ({
    days,
    timeSlots,
    getCategoryById,
    handleClassClick,
    getAllClassesForDay,
}) => {
    // Parse time string to get hours and minutes
    const parseTimeString = (timeStr: string) => {
        try {
            const date = parse(timeStr, "h:mm a", new Date())
            return {
                hours: date.getHours(),
                minutes: date.getMinutes(),
            }
        } catch (error) {
            console.error("Error parsing time:", timeStr, error)
            return { hours: 0, minutes: 0 }
        }
    }

    const findTimeSlotForClass = (classTime: string, timeSlots: string[]) => {
        const classTimeParsed = parseTimeString(classTime)

        for (let i = 0; i < timeSlots.length - 1; i++) {
            const currentSlotTime = parseTimeString(timeSlots[i])
            const nextSlotTime = parseTimeString(timeSlots[i + 1])

            if (
                (classTimeParsed.hours > currentSlotTime.hours ||
                    (classTimeParsed.hours === currentSlotTime.hours && classTimeParsed.minutes >= currentSlotTime.minutes)) &&
                (classTimeParsed.hours < nextSlotTime.hours ||
                    (classTimeParsed.hours === nextSlotTime.hours && classTimeParsed.minutes < nextSlotTime.minutes))
            ) {
                return {
                    slot: timeSlots[i],
                    offset: calculateOffset(classTimeParsed, currentSlotTime, nextSlotTime),
                }
            }
        }

        const lastSlotTime = parseTimeString(timeSlots[timeSlots.length - 1])
        if (
            classTimeParsed.hours > lastSlotTime.hours ||
            (classTimeParsed.hours === lastSlotTime.hours && classTimeParsed.minutes >= lastSlotTime.minutes)
        ) {
            return {
                slot: timeSlots[timeSlots.length - 1],
                offset: calculateOffset(classTimeParsed, lastSlotTime, { hours: lastSlotTime.hours + 1, minutes: 0 }),
            }
        }

        const firstSlotTime = parseTimeString(timeSlots[0])
        if (
            classTimeParsed.hours < firstSlotTime.hours ||
            (classTimeParsed.hours === firstSlotTime.hours && classTimeParsed.minutes < firstSlotTime.minutes)
        ) {
            return {
                slot: timeSlots[0],
                offset: 0,
            }
        }

        return { slot: timeSlots[0], offset: 0 }
    }

    const calculateOffset = (
        classTime: { hours: number; minutes: number },
        slotTime: { hours: number; minutes: number },
        nextSlotTime: { hours: number; minutes: number },
    ) => {
        const classMinutes = classTime.hours * 60 + classTime.minutes
        const slotMinutes = slotTime.hours * 60 + slotTime.minutes

        const minutesDiff = classMinutes - slotMinutes

        const slotDuration = nextSlotTime.hours * 60 + nextSlotTime.minutes - slotMinutes

        return (minutesDiff / slotDuration) * 100
    }

    return (
        <>
            {timeSlots.map((time) => (
                <React.Fragment key={time}>
                    <div className="bg-white min-h-30 h-full p-2 text-xs">{time}</div>
                    {days.map((day) => {
                        const dayClasses = getAllClassesForDay(day)

                        const slotClasses = dayClasses.filter((classItem) => {
                            if (classItem.time === time) return true

                            const { slot } = findTimeSlotForClass(classItem.time, timeSlots)
                            return slot === time
                        })

                        return (
                            <div
                                key={`${time}-${format(day, "yyyy-MM-dd")}`}
                                className={cn(
                                    "bg-white border-l border-gray-200 relative min-h-30 h-full",
                                    isSameDay(day, new Date()) && "bg-blue-50",
                                )}
                            >
                                {slotClasses.map((classData) => {
                                    const category = getCategoryById(classData.categoryId)

                                    // Calculate position for this class
                                    let topOffset = 0
                                    if (classData.time !== time) {
                                        const { offset } = findTimeSlotForClass(classData.time, timeSlots)
                                        topOffset = offset
                                    }

                                    return (
                                        <div
                                            key={classData.id}
                                            className={cn(
                                                "absolute inset-x-1 p-2 rounded z-10 h-full",
                                                category.bgColor,
                                                `cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-${category.bgColor.replace("bg-", "")} transition-all`,
                                            )}
                                            style={{
                                                top: `calc(1px + ${topOffset}%)`,
                                                maxHeight: "calc(100% - 2px)",
                                                zIndex: classData.time === time ? 1 : 2,
                                            }}
                                            onClick={() => handleClassClick(classData)}
                                        >
                                            <div className="flex flex-col gap-3">
                                                {category.icon}
                                                <span className="font-medium text-sm">{classData.name}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-1 text-xs mt-3">
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

