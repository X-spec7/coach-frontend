import React from 'react';
import { Metadata } from 'next';
import SharedLayout from '@/shared/Layouts/SharedLayout';
import ChallengesPage from '@/features/challenges/pages/challenge';

export const metadata: Metadata = {
    title:
        "Challenges | COA-CH",
    description: "This is Challenges for COA-CH",
};

const challenges: React.FC = () => {
    return (
        <SharedLayout
            headerTitle='Challenges'
            headerDescription=''
        >
            <ChallengesPage />
        </SharedLayout >
    )
}

export default challenges
