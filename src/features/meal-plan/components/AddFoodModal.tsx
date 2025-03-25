"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { FiX } from "react-icons/fi"
import type { FoodItem } from "../types/class.dto"

interface AddFoodModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (food: FoodItem) => void
    initialFood?: FoodItem
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose, onSave, initialFood }) => {
    const [food, setFood] = useState<FoodItem>({
        id: "",
        name: "",
        amount: 0,
        unit: "g",
        calories: 0,
        nutrition: {
            carb: 0,
            protein: 0,
            fat: 0,
        },
    })

    useEffect(() => {
        if (initialFood) {
            setFood(initialFood)
        } else {
            setFood({
                id: uuidv4(),
                name: "",
                amount: 0,
                unit: "g",
                calories: 0,
                nutrition: {
                    carb: 0,
                    protein: 0,
                    fat: 0,
                },
            })
        }
    }, [initialFood])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "carb" || name === "protein" || name === "fat") {
            setFood({
                ...food,
                nutrition: {
                    ...food.nutrition,
                    [name]: Number.parseInt(value) || 0,
                },
            })
        } else if (name === "amount" || name === "calories") {
            setFood({
                ...food,
                [name]: Number.parseInt(value) || 0,
            })
        } else {
            setFood({
                ...food,
                [name]: value,
            })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(food)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">{initialFood ? "Edit Food" : "Add Food"}</h3>
                    <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700" title="Close">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Food Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={food.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={food.amount}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                                Unit
                            </label>
                            <select
                                id="unit"
                                name="unit"
                                value={food.unit}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="oz">oz</option>
                                <option value="cup">cup</option>
                                <option value="tbsp">tbsp</option>
                                <option value="tsp">tsp</option>
                                <option value="piece">piece</option>
                                <option value="serving">serving</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">
                            Calories
                        </label>
                        <input
                            type="number"
                            id="calories"
                            name="calories"
                            value={food.calories}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nutrition (g)</label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="carb" className="block text-xs text-gray-500 mb-1">
                                    Carbs
                                </label>
                                <input
                                    type="number"
                                    id="carb"
                                    name="carb"
                                    value={food.nutrition.carb}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="protein" className="block text-xs text-gray-500 mb-1">
                                    Proteins
                                </label>
                                <input
                                    type="number"
                                    id="protein"
                                    name="protein"
                                    value={food.nutrition.protein}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="fat" className="block text-xs text-gray-500 mb-1">
                                    Fats
                                </label>
                                <input
                                    type="number"
                                    id="fat"
                                    name="fat"
                                    value={food.nutrition.fat}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green text-black rounded-md hover:bg-green-dark">
                            {initialFood ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFoodModal

