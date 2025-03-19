"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { mealDummyData } from "@/dev/dummy-data"
import type { Meal } from "../../types/class.dto"

// Components
import MealDetailHero from "../../components/MealDetailHero"
import MealIngredients from "../../components/MealIngredients"
import MealDirections from "../../components/MealDirections"
import MealTools from "../../components/MealTools"
import MealNotes from "../../components/MealNotes"
import MealNutritionFacts from "../../components/MealNutritionFacts"
import MealReviews from "../../components/MealReviews"
import MealValue from "../../components/MealValue"

const MealDetailPlanPage: React.FC = () => {
    const router = useRouter()
    const params = useParams()
    const [meal, setMeal] = useState<Meal | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMeal = async () => {
            setLoading(true)
            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 300))

                // Get the meal ID from the URL params
                const id = params?.id

                if (id) {
                    setMeal(mealDummyData.find((meal) => meal.id === Number(id)) || null)
                } else {
                    router.push("/meal-plan")
                }
            } catch (error) {
                console.error("Error fetching meal:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMeal()
    }, [params, router])

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto p-4 flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        )
    }

    if (!meal) {
        return (
            <div className="max-w-3xl mx-auto p-4">
                <div className="text-center py-8">
                    <h2 className="text-xl font-semibold">Meal not found</h2>
                    <p className="mt-2 text-gray-600">The meal you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                        onClick={() => router.push("/meal-plan")}
                    >
                        Back to Meal Plan
                    </button>
                </div>
            </div>
        )
    }

    return (
        <section className="grid grid-cols-1 gap-8 md:grid-cols-3 mx-auto">
            <div className="col-span-2">
                <MealDetailHero meal={meal} />
                <div className="flex md:flex-row flex-col justify-center mt-4 bg-white p-4 rounded-4xl shadow-md gap-4">
                    {meal.steps && <MealDirections steps={meal.steps} />}
                    <div className="flex flex-col gap-4 md:border-l-2 border-t-2 md:border-t-0 pt-3 md:pt-0 border-gray-bg">
                        {meal.tools && <MealTools tools={meal.tools} />}
                        {meal.notes && <MealNotes notes={meal.notes} />}
                    </div>
                </div>
                {meal.reviews && <MealReviews reviews={meal.reviews} />}
            </div>
            <div className="col-span-1 space-y-8">
                <MealValue nutritionFacts={meal.nutritionFacts} />

                {meal.ingredients && meal.servings && <MealIngredients ingredients={meal.ingredients} servings={meal.servings} />}

                {meal.nutritionFacts && <MealNutritionFacts nutritionFacts={meal.nutritionFacts} />}
            </div>

        </section>
    )
}

export default MealDetailPlanPage

