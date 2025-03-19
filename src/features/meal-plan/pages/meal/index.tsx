"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Meal } from "../../types/class.dto"


// Components
import MealHeader from "../../components/MealHeader"
import MealCategoryFilter from "../../components/MealCategoryFilter"
import MealSortDropdown from "../../components/MealSortDropdown"
import MealCard from "../../components/MealCard"
import PopularMealCard from "../../components/PopularMealCard"
import RecommendedMealCard from "../../components/RecommendedMealCard"
import SidebarSection from "../../components/SidebarSection"
import { mealDummyData } from "@/dev/dummy-data"
import { useSearchParams } from 'next/navigation'

const MealPlanPage: React.FC = () => {
    const [meals, setMeals] = useState<Meal[]>(mealDummyData)
    const [filteredMeals, setFilteredMeals] = useState<Meal[]>(mealDummyData)
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const [sortBy, setSortBy] = useState<string>("Calories")
    const searchParams = useSearchParams()

    // Filter meals based on category and search query
    useEffect(() => {
        let result = [...meals]

        // Filter by category
        if (selectedCategory !== "All") {
            result = result.filter((meal) => meal.mealTime === selectedCategory)
        }

        // Filter by search query
        if (searchParams) {
            const query = searchParams.get('query') || ""
            result = result.filter(
                (meal) => meal.mealTitle.toLowerCase().includes(query) || meal.description.toLowerCase().includes(query),
            )
        }

        // Sort meals
        if (sortBy === "Calories") {
            result.sort((a, b) => b.calory - a.calory)
        } else if (sortBy === "Health Score") {
            result.sort((a, b) => b.healthScore - a.healthScore)
        }

        setFilteredMeals(result)
    }, [meals, selectedCategory, sortBy, searchParams])

    const handleAddMeal = (meal: Meal) => {
        console.log("Adding meal to plan:", meal)
        // Implement your add meal logic here
    }


    const handleAddMenu = () => {
        console.log("Add new menu clicked")
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    const handleSortChange = (sortOption: string) => {
        setSortBy(sortOption)
    }

    const popularMeals = [
        {
            id: 1,
            title: "Grilled Steak with Sweet Potato Fries",
            rating: 4.9,
            mealTime: "Dinner",
            imageSrc: "/images/meal/lean_green.png",
        },
        {
            id: 2,
            title: "Quinoa and Black Bean Stuffed Peppers",
            rating: 4.7,
            mealTime: "Lunch",
            imageSrc: "/images/meal/lean_green.png",
        },
        {
            id: 3,
            title: "Avocado Toast with Poached Eggs",
            rating: 4.9,
            mealTime: "Breakfast",
            imageSrc: "/images/meal/lean_green.png",
        },
    ]

    // Recommended meals data
    const recommendedMeals = [
        {
            id: 1,
            title: "Overnight Oats with Almond Butter and Banana",
            mealTime: "Lunch",
            difficulty: "Easy",
            imageSrc: "/images/meal/lean_green.png",
            nutrition: {
                calories: 400,
                carbs: 50,
                protein: 12,
                fat: 16,
            },
        },
        {
            id: 2,
            title: "Grilled Steak with Sweet Potato Fries",
            mealTime: "Breakfast",
            difficulty: "Medium",
            imageSrc: "/images/meal/lean_green.png",
            nutrition: {
                calories: 450,
                carbs: 30,
                protein: 12,
                fat: 16,
            },
        },
    ]

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="h-full flex flex-col items-start justify-start bg-white rounded-4xl p-4 col-span-2">
                {/* Header with search and filters */}
                <MealHeader onAddMenu={handleAddMenu} />
                <hr className="border-gray-bg w-full mt-4" />

                {/* Category filters and sort dropdown */}
                <div className="flex justify-between items-center w-full mt-4">
                    <MealCategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
                    <MealSortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
                </div>

                {/* Meal cards */}
                <div className="flex flex-col gap-4 mt-4 w-full">
                    {filteredMeals.map((meal, index) => (
                        <MealCard key={`${meal.mealTitle}-${index}`} meal={meal} onAddMeal={handleAddMeal} />
                    ))}
                </div>
            </div>

            {/* Sidebar */}
            <div className="h-full flex flex-col items-center gap-4">
                {/* Popular Menu Section */}
                <SidebarSection title="Popular Menu">
                    {popularMeals.map((meal) => (
                        <PopularMealCard
                            key={meal.id}
                            title={meal.title}
                            rating={meal.rating}
                            mealTime={meal.mealTime}
                            imageSrc={meal.imageSrc}
                        />
                    ))}
                </SidebarSection>

                {/* Recommended Menu Section */}
                <SidebarSection title="Recommended Menu">
                    {recommendedMeals.map((meal) => (
                        <RecommendedMealCard
                            key={meal.id}
                            title={meal.title}
                            mealTime={meal.mealTime}
                            difficulty={meal.difficulty}
                            imageSrc={meal.imageSrc}
                            nutrition={meal.nutrition}
                        />
                    ))}
                </SidebarSection>
            </div>
        </div>
    )
}

export default MealPlanPage

