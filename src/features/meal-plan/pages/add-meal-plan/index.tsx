"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import type { MealPlanFormData, MealTimeData, VisibilityType, Nutrition } from "../../types/class.dto"

// Components
import FormSection from "../../components/ui/FormSection"
import FormInput from "../../components/ui/FormInput"
import FormTextarea from "../../components/ui/FormTextarea"
import ImageUploader from "../../components/ImageUploader"
import VisibilitySelector from "../../components/VisibilitySelector"
import NutritionDistribution from "../../components/NutritionDistribution"
import MealTimeSection from "../../components/MealTimeSection"
import UserTypeSelector from "../../components/UserTypeSelector"
import AIAssistant from "../../components/AIAssistant"

const defaultMealTimes: MealTimeData[] = [
    {
        id: uuidv4(),
        name: "Breakfast",
        time: "7:00 AM",
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Snacks",
        time: "10:00 AM",
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Lunch",
        time: "12:30 PM",
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Snacks",
        time: "3:30 PM",
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Dinner",
        time: "7:00 PM",
        foods: [],
    },
    {
        id: uuidv4(),
        name: "Snacks",
        time: "9:00 PM",
        foods: [],
    },
]

const AddMealPlanPage: React.FC = () => {
    const router = useRouter()
    const [userType, setUserType] = useState<"coach" | "client">("coach")
    const [formData, setFormData] = useState<MealPlanFormData>({
        name: "",
        visibility: "private",
        description: "",
        nutrition: {
            carb: 0,
            protein: 0,
            fat: 0,
        },
        mealTimes: defaultMealTimes,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    const handleGenerateMealPlan = async (prompt: string) => {
        // In a real app, this would call an AI service
        console.log("Generating meal plan with prompt:", prompt)

        // Simulate AI response
        setIsSubmitting(true)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Example AI-generated meal plan
        const aiGeneratedPlan = {
            name: "AI Generated Meal Plan",
            description: `Generated based on your prompt: "${prompt}"`,
            nutrition: {
                carb: 150,
                protein: 120,
                fat: 70,
            },
            mealTimes: defaultMealTimes.map((mealTime) => ({
                ...mealTime,
                foods: [
                    {
                        id: uuidv4(),
                        name: `AI Suggested Food for ${mealTime.name}`,
                        amount: 100,
                        unit: "g",
                        calories: 250,
                        nutrition: {
                            carb: 25,
                            protein: 20,
                            fat: 10,
                        },
                    },
                ],
            })),
        }

        setFormData({
            ...formData,
            ...aiGeneratedPlan,
        })

        setIsSubmitting(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // In a real app, this would call an API to save the meal plan
            console.log("Submitting meal plan:", formData)

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Redirect to meal plans page
            router.push("/meal-plans")
        } catch (error) {
            console.error("Error saving meal plan:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-4xl p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Create Meal Plan</h1>
                <p className="text-gray-600">Design a personalized meal plan for yourself or your clients.</p>
            </div>

            <UserTypeSelector userType={userType} onChange={setUserType} className="mb-6" />

            {userType === "client" && <AIAssistant onGenerateMealPlan={handleGenerateMealPlan} className="mb-6" />}

            <form onSubmit={handleSubmit}>
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

                {formData.mealTimes.map((mealTime) => (
                    <MealTimeSection key={mealTime.id} mealTime={mealTime} onUpdate={handleMealTimeUpdate} />
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
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-green text-black rounded-md hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Saving..." : "Save Meal Plan"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddMealPlanPage

