export interface Exercise {
  id: string;
  name: string;
  description?: string;
  sets: number;
  reps: number;
  weight: number;
  weightUnit: "kg" | "lbs";
  restSeconds: number;
  image?: string;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  exercises: Exercise[];
  lastPerformed?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkoutHistory {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string;
  duration: number; // in minutes
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: {
      setNumber: number;
      reps: number;
      weight: number;
      weightUnit: "kg" | "lbs";
    }[];
  }[];
}
