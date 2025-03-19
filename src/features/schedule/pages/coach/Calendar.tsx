"use client"

import { useEffect, useState } from "react"
import type { ClassData, CalendarView } from "../../types/class.dto"
import { categories, classes, timeSlots } from "../dummy"
import CalendarHeader from "../../components/CalendarHeader"
import CalendarGrid from "../../components/CalendarGrid"
import ScheduleDetail from "../../components/schedule-detail"
import { useCalendarDays } from "../../hooks/useCalendarDays"
import { useCalendarClasses } from "../../hooks/useCalendarClasses"

export default function Calendar() {
    const [showDetail, setShowDetail] = useState(false)
    const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<CalendarView>("week")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [filteredClasses, setFilteredClasses] = useState<ClassData[]>([])

    // Filter classes based on selected categories
    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredClasses(classes)
        } else {
            setFilteredClasses(classes.filter((classItem) => selectedCategories.includes(classItem.categoryId)))
        }
    }, [selectedCategories])

    const handleClassClick = (classData: ClassData) => {
        setSelectedClass(classData)
        setShowDetail(true)
    }

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories((prev) => {
            if (prev.includes(categoryId)) {
                return prev.filter((id) => id !== categoryId)
            } else {
                return [...prev, categoryId]
            }
        })
    }

    // Select all categories
    const selectAllCategories = () => {
        setSelectedCategories(categories.map((cat) => cat.id))
    }

    const clearAllCategories = () => {
        setSelectedCategories([])
    }

    const getCategoryById = (categoryId: string) => {
        return categories.find((cat) => cat.id === categoryId) || categories[0]
    }

    const { days, navigatePrevious, navigateNext } = useCalendarDays(currentDate, view, setCurrentDate)
    const { getClassesForTimeAndDay, getAllClassesForDay } = useCalendarClasses(filteredClasses)

    return (
        <div className="relative rounded-4xl bg-white shadow-sm w-full">
            {/* Header */}
            <CalendarHeader
                currentDate={currentDate}
                view={view}
                setView={setView}
                navigatePrevious={navigatePrevious}
                navigateNext={navigateNext}
                selectedCategories={selectedCategories}
                selectAllCategories={selectAllCategories}
                clearAllCategories={clearAllCategories}
                categories={categories}
                toggleCategory={toggleCategory}
            />

            <hr className='border-stroke w-full my-5' />

            {/* Calendar Grid */}
            <CalendarGrid
                view={view}
                days={days}
                timeSlots={timeSlots}
                currentDate={currentDate}
                getClassesForTimeAndDay={getClassesForTimeAndDay}
                getAllClassesForDay={getAllClassesForDay}
                getCategoryById={getCategoryById}
                handleClassClick={handleClassClick}
                filteredClasses={filteredClasses}
            />

            {/* Modal */}
            {showDetail && selectedClass && <ScheduleDetail classData={selectedClass} onClose={() => setShowDetail(false)} />}
        </div>
    )
}

