import type { Workout, WorkoutHistory } from "../types/workout.dto";

const mockWorkouts: Workout[] = [
  {
    id: "1",
    name: "Full Body Strength",
    description:
      "A comprehensive full body workout targeting all major muscle groups",
    category: "Strength",
    image: "/images/background/2.jpg",
    exercises: [
      {
        id: "e1",
        name: "Barbell Squat",
        description:
          "A compound exercise that targets the quadriceps, hamstrings, and glutes",
        sets: 4,
        reps: 8,
        weight: 60,
        weightUnit: "kg",
        restSeconds: 90,
        image: "/images/background/2.jpg",
        notes: "Keep your chest up and back straight throughout the movement",
      },
      {
        id: "e2",
        name: "Bench Press",
        description:
          "A compound exercise that targets the chest, shoulders, and triceps",
        sets: 4,
        reps: 8,
        weight: 50,
        weightUnit: "kg",
        restSeconds: 90,
        image: "/images/background/2.jpg",
      },
      {
        id: "e3",
        name: "Deadlift",
        description:
          "A compound exercise that targets the back, glutes, and hamstrings",
        sets: 3,
        reps: 6,
        weight: 80,
        weightUnit: "kg",
        restSeconds: 120,
        image: "/images/background/2.jpg",
        notes: "Keep your back straight and engage your core",
      },
    ],
    lastPerformed: "2 days ago",
    createdAt: "2023-01-15",
    updatedAt: "2023-03-20",
  },
  {
    id: "2",
    name: "Upper Body Push",
    description: "Focus on pushing movements for chest, shoulders, and triceps",
    category: "Strength",
    image: "/images/background/2.jpg",
    exercises: [
      {
        id: "e4",
        name: "Incline Dumbbell Press",
        sets: 4,
        reps: 10,
        weight: 20,
        weightUnit: "kg",
        restSeconds: 60,
        image: "/images/background/2.jpg",
      },
      {
        id: "e5",
        name: "Overhead Press",
        sets: 3,
        reps: 8,
        weight: 30,
        weightUnit: "kg",
        restSeconds: 90,
        image: "/images/background/2.jpg",
      },
      {
        id: "e6",
        name: "Tricep Pushdown",
        sets: 3,
        reps: 12,
        weight: 15,
        weightUnit: "kg",
        restSeconds: 60,
        image: "/images/background/2.jpg",
      },
    ],
    lastPerformed: "5 days ago",
    createdAt: "2023-02-10",
    updatedAt: "2023-03-15",
  },
  {
    id: "3",
    name: "HIIT Cardio",
    description:
      "High-intensity interval training to improve cardiovascular fitness and burn calories",
    category: "HIIT",
    image: "/images/background/2.jpg",
    exercises: [
      {
        id: "e7",
        name: "Burpees",
        sets: 4,
        reps: 15,
        weight: 0,
        weightUnit: "kg",
        restSeconds: 30,
        image: "/images/background/2.jpg",
      },
      {
        id: "e8",
        name: "Mountain Climbers",
        sets: 4,
        reps: 30,
        weight: 0,
        weightUnit: "kg",
        restSeconds: 30,
        image: "/images/background/2.jpg",
      },
      {
        id: "e9",
        name: "Jump Squats",
        sets: 4,
        reps: 20,
        weight: 0,
        weightUnit: "kg",
        restSeconds: 30,
        image: "/images/background/2.jpg",
      },
    ],
    lastPerformed: "Yesterday",
    createdAt: "2023-03-01",
    updatedAt: "2023-03-22",
  },
  {
    id: "4",
    name: "Core Strength",
    description: "A workout focused on strengthening the core muscles",
    category: "Strength",
    image: "/images/background/2.jpg",
    exercises: [
      {
        id: "e10",
        name: "Plank",
        sets: 3,
        reps: 1,
        weight: 0,
        weightUnit: "kg",
        restSeconds: 60,
        image: "/images/background/2.jpg",
        notes: "Hold the plank position for 60 seconds per set",
      },
      {
        id: "e11",
        name: "Russian Twists",
        sets: 3,
        reps: 20,
        weight: 5,
        weightUnit: "kg",
        restSeconds: 30,
        image: "/images/background/2.jpg",
      },
      {
        id: "e12",
        name: "Leg Raises",
        sets: 3,
        reps: 15,
        weight: 0,
        weightUnit: "kg",
        restSeconds: 30,
        image: "/images/background/2.jpg",
      },
    ],
    lastPerformed: "3 days ago",
    createdAt: "2023-03-10",
    updatedAt: "2023-03-21",
  },
  {
    id: "5",
    name: "Lower Body Blast",
    description: "A workout targeting the lower body muscles",
    category: "Strength",
    image: "/images/background/2.jpg",
    exercises: [
      {
        id: "e13",
        name: "Lunges",
        sets: 3,
        reps: 12,
        weight: 20,
        weightUnit: "kg",
        restSeconds: 60,
        image: "/images/background/2.jpg",
      },
      {
        id: "e14",
        name: "Leg Press",
        sets: 4,
        reps: 10,
        weight: 100,
        weightUnit: "kg",
        restSeconds: 90,
        image: "/images/background/2.jpg",
      },
      {
        id: "e15",
        name: "Calf Raises",
        sets: 3,
        reps: 15,
        weight: 40,
        weightUnit: "kg",
        restSeconds: 30,
        image: "/images/background/2.jpg",
      },
    ],
    lastPerformed: "4 days ago",
    createdAt: "2023-03-05",
    updatedAt: "2023-03-19",
  },
  {
    id: "6",
    name: "Pull Day",
    description: "Focus on pulling movements for back and biceps",
    category: "Strength",
    image: "/images/background/2.jpg",
    exercises: [
      {
        id: "e16",
        name: "Pull-Ups",
        sets: 3,
        reps: 10,
        weight: 0,
        weightUnit: "kg",
        restSeconds: 90,
        image: "/images/background/2.jpg",
      },
      {
        id: "e17",
        name: "Barbell Rows",
        sets: 4,
        reps: 8,
        weight: 50,
        weightUnit: "kg",
        restSeconds: 90,
        image: "/images/background/2.jpg",
      },
      {
        id: "e18",
        name: "Bicep Curls",
        sets: 3,
        reps: 12,
        weight: 15,
        weightUnit: "kg",
        restSeconds: 60,
        image: "/images/background/2.jpg",
      },
    ],
    lastPerformed: "1 week ago",
    createdAt: "2023-03-08",
    updatedAt: "2023-03-18",
  },
];

const mockWorkoutHistory: WorkoutHistory[] = [
  {
    id: "h1",
    workoutId: "1",
    workoutName: "Full Body Strength",
    date: "2023-03-20",
    duration: 65,
    exercises: [
      {
        exerciseId: "e1",
        exerciseName: "Barbell Squat",
        sets: [
          { setNumber: 1, reps: 8, weight: 60, weightUnit: "kg" },
          { setNumber: 2, reps: 8, weight: 65, weightUnit: "kg" },
          { setNumber: 3, reps: 7, weight: 65, weightUnit: "kg" },
          { setNumber: 4, reps: 6, weight: 65, weightUnit: "kg" },
        ],
      },
      {
        exerciseId: "e2",
        exerciseName: "Bench Press",
        sets: [
          { setNumber: 1, reps: 8, weight: 50, weightUnit: "kg" },
          { setNumber: 2, reps: 8, weight: 50, weightUnit: "kg" },
          { setNumber: 3, reps: 7, weight: 50, weightUnit: "kg" },
          { setNumber: 4, reps: 6, weight: 50, weightUnit: "kg" },
        ],
      },
      {
        exerciseId: "e3",
        exerciseName: "Deadlift",
        sets: [
          { setNumber: 1, reps: 6, weight: 80, weightUnit: "kg" },
          { setNumber: 2, reps: 6, weight: 85, weightUnit: "kg" },
          { setNumber: 3, reps: 5, weight: 85, weightUnit: "kg" },
        ],
      },
    ],
  },
  {
    id: "h2",
    workoutId: "3",
    workoutName: "HIIT Cardio",
    date: "2023-03-22",
    duration: 30,
    exercises: [
      {
        exerciseId: "e7",
        exerciseName: "Burpees",
        sets: [
          { setNumber: 1, reps: 15, weight: 0, weightUnit: "kg" },
          { setNumber: 2, reps: 15, weight: 0, weightUnit: "kg" },
          { setNumber: 3, reps: 12, weight: 0, weightUnit: "kg" },
          { setNumber: 4, reps: 10, weight: 0, weightUnit: "kg" },
        ],
      },
      {
        exerciseId: "e8",
        exerciseName: "Mountain Climbers",
        sets: [
          { setNumber: 1, reps: 30, weight: 0, weightUnit: "kg" },
          { setNumber: 2, reps: 30, weight: 0, weightUnit: "kg" },
          { setNumber: 3, reps: 25, weight: 0, weightUnit: "kg" },
          { setNumber: 4, reps: 20, weight: 0, weightUnit: "kg" },
        ],
      },
      {
        exerciseId: "e9",
        exerciseName: "Jump Squats",
        sets: [
          { setNumber: 1, reps: 20, weight: 0, weightUnit: "kg" },
          { setNumber: 2, reps: 20, weight: 0, weightUnit: "kg" },
          { setNumber: 3, reps: 15, weight: 0, weightUnit: "kg" },
          { setNumber: 4, reps: 15, weight: 0, weightUnit: "kg" },
        ],
      },
    ],
  },
];

export const WorkoutService = {
  getWorkouts: async (): Promise<Workout[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockWorkouts;
  },

  getWorkoutById: async (id: string): Promise<Workout | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockWorkouts.find((workout) => workout.id === id) || null;
  },

  createWorkout: async (
    workout: Omit<Workout, "id" | "createdAt" | "updatedAt">,
  ): Promise<Workout> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const now = new Date().toISOString().split("T")[0];
    const newWorkout: Workout = {
      id: crypto.randomUUID(),
      ...workout,
      createdAt: now,
      updatedAt: now,
    };

    return newWorkout;
  },

  updateWorkout: async (
    id: string,
    workout: Partial<Workout>,
  ): Promise<Workout> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingWorkout = mockWorkouts.find((w) => w.id === id);
    if (!existingWorkout) {
      throw new Error("Workout not found");
    }

    const updatedWorkout: Workout = {
      ...existingWorkout,
      ...workout,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    return updatedWorkout;
  },

  deleteWorkout: async (id: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  },

  getWorkoutHistory: async (): Promise<WorkoutHistory[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockWorkoutHistory;
  },

  recordWorkoutCompletion: async (
    workoutId: string,
  ): Promise<WorkoutHistory> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const workout = mockWorkouts.find((w) => w.id === workoutId);
    if (!workout) {
      throw new Error("Workout not found");
    }

    // Create a simplified workout history record
    const historyRecord: WorkoutHistory = {
      id: crypto.randomUUID(),
      workoutId,
      workoutName: workout.name,
      date: new Date().toISOString().split("T")[0],
      duration: 45, // Mock duration
      exercises: workout.exercises.map((exercise) => ({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        sets: Array.from({ length: exercise.sets }, (_, i) => ({
          setNumber: i + 1,
          reps: exercise.reps,
          weight: exercise.weight,
          weightUnit: exercise.weightUnit,
        })),
      })),
    };

    return historyRecord;
  },
};
