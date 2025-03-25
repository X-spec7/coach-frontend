"use client"

import type React from "react"
import { useState } from "react"
import { FiPlus } from "react-icons/fi"
import type { MealTimeData, FoodItem } from "../types/class.dto"
import FoodItemRow from "./FoodItemRow"
import AddFoodModal from "./AddFoodModal"

interface MealTimeSectionProps {
    mealTime: MealTimeData
    onUpdate: (updatedMealTime: MealTimeData) => void
}

const MealTimeSection: React.FC<MealTimeSectionProps> = ({ mealTime, onUpdate }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [editingFood, setEditingFood] = useState<FoodItem | null>(null)

    const handleAddFood = (food: FoodItem) => {
        const updatedFoods = [...mealTime.foods, food]
        onUpdate({
            ...mealTime,
            foods: updatedFoods,
        })
        setIsAddModalOpen(false)
    }

    const handleEditFood = (food: FoodItem) => {
        setEditingFood(food)
        setIsAddModalOpen(true)
    }

    const handleUpdateFood = (updatedFood: FoodItem) => {
        const updatedFoods = mealTime.foods.map((food) => (food.id === updatedFood.id ? updatedFood : food))
        onUpdate({
            ...mealTime,
            foods: updatedFoods,
        })
        setEditingFood(null)
        setIsAddModalOpen(false)
    }

    const handleDeleteFood = (foodId: string) => {
        const updatedFoods = mealTime.foods.filter((food) => food.id !== foodId)
        onUpdate({
            ...mealTime,
            foods: updatedFoods,
        })
    }

    // Calculate totals
    const totalCalories = mealTime.foods.reduce((sum, food) => sum + food.calories, 0)
    const totalCarbs = mealTime.foods.reduce((sum, food) => sum + food.nutrition.carb, 0)
    const totalProteins = mealTime.foods.reduce((sum, food) => sum + food.nutrition.protein, 0)
    const totalFats = mealTime.foods.reduce((sum, food) => sum + food.nutrition.fat, 0)

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{mealTime.name}</h3>
                <span className="text-sm text-gray-500">{mealTime.time}</span>
            </div>

            <div className="bg-gray-bg rounded-xl p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="text-left text-gray-500 text-sm">
                                <th className="py-2 px-2 font-medium">Food</th>
                                <th className="py-2 px-2 font-medium text-center">Amount</th>
                                <th className="py-2 px-2 font-medium text-center">Calories</th>
                                <th className="py-2 px-2 font-medium text-center">Carbs</th>
                                <th className="py-2 px-2 font-medium text-center">Proteins</th>
                                <th className="py-2 px-2 font-medium text-center">Fats</th>
                                <th className="py-2 px-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mealTime.foods.length > 0 ? (
                                <>
                                    {mealTime.foods.map((food) => (
                                        <FoodItemRow key={food.id} food={food} onEdit={handleEditFood} onDelete={handleDeleteFood} />
                                    ))}
                                    <tr className="border-t border-gray-300 font-medium">
                                        <td className="py-3 px-2">Total</td>
                                        <td className="py-3 px-2"></td>
                                        <td className="py-3 px-2 text-center">{totalCalories}</td>
                                        <td className="py-3 px-2 text-center">{totalCarbs}g</td>
                                        <td className="py-3 px-2 text-center">{totalProteins}g</td>
                                        <td className="py-3 px-2 text-center">{totalFats}g</td>
                                        <td className="py-3 px-2"></td>
                                    </tr>
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-4 text-center text-gray-500">
                                        No foods added yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setEditingFood(null)
                        setIsAddModalOpen(true)
                    }}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-green text-black rounded-full hover:bg-green-dark"
                >
                    <FiPlus size={16} />
                    <span>Add food</span>
                </button>
            </div>

            {isAddModalOpen && (
                <AddFoodModal
                    isOpen={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false)
                        setEditingFood(null)
                    }}
                    onSave={editingFood ? handleUpdateFood : handleAddFood}
                    initialFood={editingFood || undefined}
                />
            )}
        </div>
    )
}

export default MealTimeSection

