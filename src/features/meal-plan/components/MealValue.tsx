import React from 'react';
import { NutritionFacts } from "../types/class.dto";

interface MealNutritionFactsProps {
    nutritionFacts: NutritionFacts;
}

const MealValue: React.FC<MealNutritionFactsProps> = ({ nutritionFacts }) => {
    return (
        <div className="p-3.5 bg-blue rounded-20 grid grid-cols-4 gap-6">
            {[
                { label: "Calories", value: nutritionFacts?.calories, unit: "cal" },
                { label: "Protein", value: nutritionFacts?.protein, unit: "gr" },
                { label: "Carbs", value: nutritionFacts?.totalCarbohydrates, unit: "gr" },
                { label: "Fats", value: nutritionFacts?.totalFat, unit: "gr" }
            ].map(({ label, value, unit }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                    <div className="text-center text-gray-20 text-sm font-normal">{label}</div>
                    <div className="p-2 bg-white rounded-2xl flex flex-col items-center gap-0.5 w-full">
                        <div className="text-gray-20 text-sm font-medium leading-none">{value || 0}</div>
                        <div className="text-[#4d5260] text-sm font-normal">{unit}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MealValue;