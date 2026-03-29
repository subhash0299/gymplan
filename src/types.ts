export interface UserData {
  /** Optional display name for PDF cover */
  name: string;
  fitnessGoal: 'Build Muscle' | 'Lose Fat' | 'Gain Strength' | 'Stay Fit' | '';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | '';
  workoutLocation: 'Home' | 'Gym' | '';
  equipment: 'None' | 'Dumbbells' | 'Full Gym' | '';
  workoutDays: number;
  /** Spread workouts across a 7-day week with rest days between sessions */
  scheduleRestDays: boolean;
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
  kind: 'workout' | 'rest';
  focus: string;
  warmup: string[];
  exercises: Exercise[];
  cooldown: string[];
  /** Shown on rest days */
  restDayNote?: string;
}

export interface BmiSnapshot {
  value: number;
  category: string;
}

export interface WorkoutPlan {
  userData: UserData;
  weeklyPlan: DayWorkout[];
  /** Set when height and weight could be parsed into BMI */
  bmi: BmiSnapshot | null;
  /** Seeded shuffle for regenerate variety */
  seed: number;
  /** Typical session length for workout days (warm-up through cool-down) */
  estimatedSessionMinutes: { min: number; max: number };
  /** When the plan was generated (for PDF) */
  generatedAt: string;
}
