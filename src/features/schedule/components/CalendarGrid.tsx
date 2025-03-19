import type React from "react"
import cn from "classnames"
import type { CalendarView, ClassData, ClassCategory } from "../types/class.dto"
import { format, isSameDay } from "date-fns"
import CalendarMonthView from "./CalendarMonthView"
import CalendarDayWeekView from "./CalendarDayWeekView"
// import CalendarDayWeekView from "./CalendarDayWeekView"

interface CalendarGridProps {
    view: CalendarView
    days: Date[]
    timeSlots: string[]
    currentDate: Date
    getClassesForTimeAndDay: (time: string, day: Date) => ClassData[]
    getAllClassesForDay: (day: Date) => ClassData[]
    getCategoryById: (categoryId: string) => ClassCategory
    handleClassClick: (classData: ClassData) => void
    filteredClasses: ClassData[]
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
    view,
    days,
    timeSlots,
    currentDate,
    getClassesForTimeAndDay,
    getAllClassesForDay,
    getCategoryById,
    handleClassClick,
    filteredClasses,
}) => {
    return (
        <div
            className={cn(
                "grid gap-px bg-gray-200 border border-gray-200 rounded-4xl overflow-hidden",
                view === "day"
                    ? "grid-cols-[100px_1fr]"
                    : view === "week"
                        ? "grid-cols-[100px_repeat(7,1fr)]"
                        : "grid-cols-[repeat(7,1fr)]",
            )}
        >
            {view !== "month" && (
                <>
                    <div className="bg-white p-2 text-xs font-medium">
                        <p className="bg-gray-bg rounded-full h-8 flex items-center justify-center text-gray-30">
                            UTC +1
                        </p>
                    </div>
                    {days.map((day) => (
                        <div
                            key={format(day, "yyyy-MM-dd")}
                            className={cn(
                                "bg-white p-2 text-xs font-medium text-center",
                                isSameDay(day, new Date()) && "bg-blue-50",
                            )}
                        >
                            <div className="flex items-center justify-center bg-gray-bg rounded-full h-8">
                                <p className="text-gray-20">{format(day, "EEEE")},</p> &nbsp;
                                <p className="text-sm font-bold text-gray-30">{format(day, "d")}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}
            {view === "month" ? (
                <CalendarMonthView
                    days={days}
                    currentDate={currentDate}
                    filteredClasses={filteredClasses}
                    getCategoryById={getCategoryById}
                    handleClassClick={handleClassClick}
                />
            ) : (
                <CalendarDayWeekView
                    days={days}
                    timeSlots={timeSlots}
                    getAllClassesForDay={getAllClassesForDay}
                    getCategoryById={getCategoryById}
                    handleClassClick={handleClassClick}
                />
            )}
        </div>
    )
}

export default CalendarGrid

