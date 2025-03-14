import React from 'react';
import { Metadata } from 'next';
import SchedulePage from '@/features/schedule/pages';

export const metadata: Metadata = {
  title:
    "Schedule | COA-CH",
  description: "This is Schedule for COA-CH",
};

const Schedule:React.FC = () => {
  return (
    <SchedulePage />
  )
}

export default Schedule
