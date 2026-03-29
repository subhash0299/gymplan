export interface UserData {
  fitnessGoal: 'Build Muscle' | 'Lose Fat' | 'Gain Strength' | 'Stay Fit' | '';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | '';
  workoutLocation: 'Home' | 'Gym' | '';
  equipment: 'None' | 'Dumbbells' | 'Full Gym' | '';
  workoutDays: number;
  age: string;
  height: string;
  weight: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface DayWorkout {
  day: string;
  focus: string;
  warmup: string[];
  exercises: Exercise[];
  cooldown: string[];
}

export interface WorkoutPlan {
  userData: UserData;
  weeklyPlan: DayWorkout[];
}
