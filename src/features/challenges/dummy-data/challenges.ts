import { Challenge } from "../types";

export const challengesDummyData: Challenge[] = [
  {
    id: "1",
    title: "Pas - Actif amateur - 60'000 pas",
    description: "Steps, Total Cumulative, 60000 steps, Weekly",
    status: "active",
    type: "steps",
    goal: {
      type: "steps",
      amount: 60000,
      unit: "steps",
      frequency: "weekly",
    },
    participants: 34,
    endDate: "17-03-2025",
    image: "/images/work-out.png",
    organization: "COAC-CH",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: "2",
    title: "Cardio Challenge - 30 Day Streak",
    description: "Cardio Workouts, Streak, 30 days, Monthly",
    status: "active",
    type: "cardio",
    goal: {
      type: "streak",
      amount: 30,
      unit: "days",
      frequency: "monthly",
    },
    participants: 56,
    endDate: "15-04-2025",
    image: "/images/work-out.png",
    organization: "COAC-CH",
    createdAt: "2023-01-15",
    updatedAt: "2023-01-15",
  },
  {
    id: "3",
    title: "Strength Training - 100 Workouts",
    description: "Strength Training, Total Cumulative, 100 workouts, Quarterly",
    status: "upcoming",
    type: "strength",
    goal: {
      type: "workouts",
      amount: 100,
      unit: "workouts",
      frequency: "quarterly",
    },
    participants: 28,
    endDate: "30-06-2025",
    image: "/images/work-out.png",
    organization: "COAC-CH",
    createdAt: "2023-02-01",
    updatedAt: "2023-02-01",
  },
  {
    id: "4",
    title: "Yoga & Flexibility - 50 Hours",
    description: "Yoga, Total Cumulative, 50 hours, Monthly",
    status: "active",
    type: "yoga",
    goal: {
      type: "duration",
      amount: 50,
      unit: "hours",
      frequency: "monthly",
    },
    participants: 42,
    endDate: "20-05-2025",
    image: "/images/work-out.png",
    organization: "COAC-CH",
    createdAt: "2023-02-15",
    updatedAt: "2023-02-15",
  },
  {
    id: "5",
    title: "Nutrition Challenge - 30 Day Clean Eating",
    description: "Nutrition, Streak, 30 days, Monthly",
    status: "completed",
    type: "nutrition",
    goal: {
      type: "streak",
      amount: 30,
      unit: "days",
      frequency: "monthly",
    },
    participants: 67,
    endDate: "10-02-2025",
    image: "/images/work-out.png",
    organization: "COAC-CH",
    createdAt: "2023-03-01",
    updatedAt: "2023-03-01",
  },
  {
    id: "6",
    title: "Marathon Training - 500km",
    description: "Running, Total Cumulative, 500 kilometers, Quarterly",
    status: "active",
    type: "running",
    goal: {
      type: "distance",
      amount: 500,
      unit: "kilometers",
      frequency: "quarterly",
    },
    participants: 31,
    endDate: "30-07-2025",
    image: "/images/work-out.png",
    organization: "COAC-CH",
    createdAt: "2023-03-15",
    updatedAt: "2023-03-15",
  },
];
