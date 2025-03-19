import React from 'react';
import { Metadata } from 'next';
import MealDetailPlanPage from '@/features/meal-plan/pages/meal-detail';
import SharedLayout from '@/shared/Layouts/SharedLayout';
import BackLink from './BackLink';

export const metadata: Metadata = {
    title:
        "Meal Plan for COA-CH",
    description: "This is Meal Plan for COA-CH",
};

const MealPlan: React.FC = () => {
    return (
        <>
            <BackLink />
            <SharedLayout
                headerTitle='Detail Menu'
                headerDescription=''
            >
                <MealDetailPlanPage />
            </SharedLayout >
        </>
    )
}

export default MealPlan
