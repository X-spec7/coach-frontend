"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import type { MealPlanFormData, MealTimeData, VisibilityType, Nutrition, DayOfWeek } from "../../types/class.dto"

// Components
import FormSection from "../../components/ui/FormSection"
import FormInput from "../../components/ui/FormInput"
import FormTextarea from "../../components/ui/FormTextarea"
import ImageUploader from "../../components/ImageUploader"
import VisibilitySelector from "../../components/VisibilitySelector"
import NutritionDistribution from "../../components/NutritionDistribution"
import MealTimeSection from "../../components/MealTimeSection"
import ClientSelector from "../../components/ClientSelector"
import PlanTypeSelector from "../../components/PlanTypeSelector"
import DaySelector from "../../components/DaySelector"

const defaultMealTimes = (day: DayOfWeek = "all"): MealTimeData[] => [
    {
        id: uuidv4(),
        name: "Breakfast",
        time: "7:00 AM",
        day,
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Snacks",
        time: "10:00 AM",
        day,
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Lunch",
        time: "12:30 PM",
        day,
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Snacks",
        time: "3:30 PM",
        day,
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Dinner",
        time: "7:00 PM",
        day,
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Snacks",
        time: "9:00 PM",
        day,
        foods: [],
    },
]

const CoachMealPlanPage: React.FC = () => {
    const router = useRouter()
    const [selectedClient, setSelectedClient] = useState<string>("")
    const [planType, setPlanType] = useState<"daily" | "weekly">("daily")
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>("all")
    const [formData, setFormData] = useState<MealPlanFormData>({
        name: "",
        visibility: "clients",
        description: "",
        nutrition: {
            carb: 0,
            protein: 0,
            fat: 0,
        },
        mealTimes: defaultMealTimes(),
        planType: "daily",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Update meal times when plan type changes
    useEffect(() => {
        if (planType === "daily") {
            setFormData({
                ...formData,
                planType,
                mealTimes: defaultMealTimes(),
            })
        } else {
            // For weekly plan, create meal times for each day
            const weeklyMealTimes: MealTimeData[] = []
            const days: DayOfWeek[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

            days.forEach((day) => {
                weeklyMealTimes.push(...defaultMealTimes(day))
            })

            setFormData({
                ...formData,
                planType,
                mealTimes: weeklyMealTimes,
            })
        }
    }, [planType])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleVisibilityChange = (visibility: VisibilityType) => {
        setFormData({
            ...formData,
            visibility,
        })
    }

    const handleImageChange = (file: File | null) => {
        setFormData({
            ...formData,
            image: file || undefined,
        })
    }

    const handleNutritionChange = (nutrition: Nutrition) => {
        setFormData({
            ...formData,
            nutrition,
        })
    }

    const handleMealTimeUpdate = (updatedMealTime: MealTimeData) => {
        const updatedMealTimes = formData.mealTimes.map((mealTime) =>
            mealTime.id === updatedMealTime.id ? updatedMealTime : mealTime,
        )
        setFormData({
            ...formData,
            mealTimes: updatedMealTimes,
        })
    }

    const handleClientChange = (clientId: string) => {
        setSelectedClient(clientId)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // In a real app, this would call an API to save the meal plan
            console.log("Submitting meal plan for client:", selectedClient, formData)

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Redirect to meal plans page
            router.push("/meal-plan")
        } catch (error) {
            console.error("Error saving meal plan:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Filter meal times based on selected day (for weekly plan)
    const filteredMealTimes =
        planType === "weekly" && selectedDay !== "all"
            ? formData.mealTimes.filter((mealTime) => mealTime.day === selectedDay)
            : formData.mealTimes

    return (
        <div className="bg-white rounded-4xl p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Create Client Meal Plan</h1>
                <p className="text-gray-600">Design a personalized meal plan for your clients.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <FormSection title="Client Selection">
                    <ClientSelector selectedClient={selectedClient} onChange={handleClientChange} />
                </FormSection>

                <FormSection title="Plan Type">
                    <PlanTypeSelector planType={planType} onChange={setPlanType} className="mb-4" />

                    {planType === "weekly" && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Day to View/Edit</label>
                            <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} />
                        </div>
                    )}
                </FormSection>

                <FormSection title="Meal Plan Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <FormInput
                                id="name"
                                label="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Add a name"
                                required
                            />

                            <VisibilitySelector value={formData.visibility} onChange={handleVisibilityChange} />

                            <FormTextarea
                                id="description"
                                label="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Add a description"
                            />
                        </div>

                        <div>
                            <ImageUploader initialImage={formData.imageUrl} onImageChange={handleImageChange} />
                        </div>
                    </div>
                </FormSection>

                <FormSection title="Nutrition Distribution">
                    <NutritionDistribution nutrition={formData.nutrition} onChange={handleNutritionChange} />
                </FormSection>

                {filteredMealTimes.map((mealTime) => (
                    <MealTimeSection
                        key={mealTime.id}
                        mealTime={mealTime}
                        onUpdate={handleMealTimeUpdate}
                        showDay={planType === "weekly"}
                    />
                ))}

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || !selectedClient}
                        className="px-6 py-3 bg-green text-black rounded-md hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Saving..." : "Assign to Client"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CoachMealPlanPage

