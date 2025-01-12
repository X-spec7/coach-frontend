import { Class } from "@/shared/types/class.type"

export const classDummyData: Class[] = [
  {
    category: 'Strength',
    title: 'Strength & Conditioning',
    tutor: 'Jordan Reed',
    videoNumber: 12,
    sessionRange: {
      minimumDuration: 30,
      maximumDuration: 45,
    },
    level: 'Intermediate',
    durationPerSession: 30,
    price: 100,
  },
  {
    category: 'Cardio',
    title: 'Cardio Blast',
    tutor: 'Emily Thompson',
    videoNumber: 10,
    sessionRange: {
      minimumDuration: 30,
      maximumDuration: 45,
    },
    level: 'Beginner',
    durationPerSession: 30,
    price: 100,
  },
  {
    category: 'Core',
    title: 'Core Strength',
    tutor: 'Alex Morgan',
    videoNumber: 9,
    sessionRange: {
      minimumDuration: 30,
      maximumDuration: 45,
    },
    level: 'Advanced',
    durationPerSession: 30,
    price: 100,
  },
]
