import React from 'react';
import { Metadata } from 'next';
import MealPlanPage from '@/features/meal-plan';

export const metadata: Metadata = {
  title:
    "Meal Plan | COA-CH",
  description: "This is Meal Plan for COA-CH",
};

const MealPlan: React.FC = () => {
  return (
    <MealPlanPage />
  )
}

export default MealPlan
