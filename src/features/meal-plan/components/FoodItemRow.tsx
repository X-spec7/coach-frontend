"use client"

import type React from "react"
import { FiTrash2, FiEdit2 } from "react-icons/fi"
import type { FoodItem } from "../types/class.dto"

interface FoodItemRowProps {
    food: FoodItem
    onEdit: (food: FoodItem) => void
    onDelete: (foodId: string) => void
}

const FoodItemRow: React.FC<FoodItemRowProps> = ({ food, onEdit, onDelete }) => {
    return (
        <tr className="border-b border-gray-200">
            <td className="py-3 px-2">{food.name}</td>
            <td className="py-3 px-2 text-center">
                {food.amount} {food.unit}
            </td>
            <td className="py-3 px-2 text-center">{food.calories}</td>
            <td className="py-3 px-2 text-center">{food.nutrition.carb}g</td>
            <td className="py-3 px-2 text-center">{food.nutrition.protein}g</td>
            <td className="py-3 px-2 text-center">{food.nutrition.fat}g</td>
            <td className="py-3 px-2 text-right">
                <div className="flex justify-end space-x-2">
                    <button type="button" title="Edit" onClick={() => onEdit(food)} className="text-blue-500 hover:text-blue-700">
                        <FiEdit2 size={16} />
                    </button>
                    <button type="button" onClick={() => onDelete(food.id)} className="text-red-500 hover:text-red-700" title="Delete">
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default FoodItemRow

