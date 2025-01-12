import React from 'react';
import { Metadata } from 'next';
import ExercisesPage from '@/features/exercises';

export const metadata: Metadata = {
  title:
    "Exercises | COA-CH",
  description: "This is Exercises for COA-CH",
};

const Exercises: React.FC = () => {
  return (
    <ExercisesPage />
  )
}

export default Exercises
