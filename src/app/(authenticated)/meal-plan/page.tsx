import React from 'react';
import { Metadata } from 'next';
import MealPlanPage from '@/features/meal-plan/pages/meal';
import SharedLayout from '@/shared/Layouts/SharedLayout';

export const metadata: Metadata = {
  title:
    "Meal Plan | COA-CH",
  description: "This is Meal Plan for COA-CH",
};

const MealPlan: React.FC = () => {
  return (
    <SharedLayout
      headerTitle='Meal Plan'
      headerDescription='Explore a Variety of Meal Options'
    >
      <MealPlanPage />
    </SharedLayout >
  )
}

export default MealPlan
