import { UserData, WorkoutPlan, DayWorkout, Exercise } from './types';

const warmupExercises = [
  '5-10 minutes light cardio (jogging, jumping jacks, or cycling)',
  'Dynamic stretching (arm circles, leg swings)',
  'Mobility exercises for target muscle groups'
];

const cooldownExercises = [
  '5-10 minutes light cardio cooldown',
  'Static stretching (hold each stretch 30 seconds)',
  'Deep breathing and recovery'
];

const exerciseDatabase = {
  chest: {
    gym: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Dips', sets: 3, reps: '10-12', rest: '60s' }
    ],
    dumbbells: [
      { name: 'Dumbbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Push-ups', sets: 3, reps: '15-20', rest: '60s' }
    ],
    bodyweight: [
      { name: 'Push-ups', sets: 4, reps: '15-20', rest: '60s' },
      { name: 'Wide Push-ups', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Diamond Push-ups', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Decline Push-ups', sets: 3, reps: '12-15', rest: '60s' }
    ]
  },
  back: {
    gym: [
      { name: 'Pull-ups', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Cable Rows', sets: 3, reps: '12-15', rest: '60s' }
    ],
    dumbbells: [
      { name: 'Dumbbell Rows', sets: 4, reps: '10-12', rest: '90s' },
      { name: 'Renegade Rows', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Reverse Flyes', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Pullover', sets: 3, reps: '12-15', rest: '60s' }
    ],
    bodyweight: [
      { name: 'Pull-ups (or Assisted)', sets: 4, reps: '6-10', rest: '90s' },
      { name: 'Inverted Rows', sets: 4, reps: '10-12', rest: '60s' },
      { name: 'Superman Holds', sets: 3, reps: '30-45s', rest: '60s' },
      { name: 'Reverse Snow Angels', sets: 3, reps: '15-20', rest: '60s' }
    ]
  },
  legs: {
    gym: [
      { name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '120s' },
      { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Leg Curls', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '60s' }
    ],
    dumbbells: [
      { name: 'Goblet Squats', sets: 4, reps: '10-12', rest: '90s' },
      { name: 'Dumbbell Romanian Deadlifts', sets: 4, reps: '10-12', rest: '90s' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Dumbbell Lunges', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Single-Leg Calf Raises', sets: 3, reps: '15-20', rest: '60s' }
    ],
    bodyweight: [
      { name: 'Bodyweight Squats', sets: 4, reps: '20-25', rest: '60s' },
      { name: 'Jump Squats', sets: 3, reps: '15-20', rest: '60s' },
      { name: 'Lunges', sets: 3, reps: '15-20', rest: '60s' },
      { name: 'Single-Leg Deadlifts', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Wall Sits', sets: 3, reps: '45-60s', rest: '60s' }
    ]
  },
  shoulders: {
    gym: [
      { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Front Raises', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60s' }
    ],
    dumbbells: [
      { name: 'Dumbbell Shoulder Press', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Front Raises', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Bent-Over Lateral Raises', sets: 3, reps: '12-15', rest: '60s' }
    ],
    bodyweight: [
      { name: 'Pike Push-ups', sets: 4, reps: '10-15', rest: '60s' },
      { name: 'Handstand Hold (Wall)', sets: 3, reps: '20-30s', rest: '60s' },
      { name: 'Plank to Down Dog', sets: 3, reps: '15-20', rest: '60s' },
      { name: 'Arm Circles', sets: 3, reps: '30s each', rest: '60s' }
    ]
  },
  arms: {
    gym: [
      { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', rest: '60s' }
    ],
    dumbbells: [
      { name: 'Dumbbell Curls', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Tricep Kickbacks', sets: 3, reps: '12-15', rest: '60s' }
    ],
    bodyweight: [
      { name: 'Close-Grip Push-ups', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Tricep Dips (Chair)', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Chin-ups', sets: 3, reps: '6-10', rest: '60s' },
      { name: 'Diamond Push-ups', sets: 3, reps: '10-12', rest: '60s' }
    ]
  },
  core: {
    all: [
      { name: 'Plank', sets: 3, reps: '45-60s', rest: '45s' },
      { name: 'Russian Twists', sets: 3, reps: '20-30', rest: '45s' },
      { name: 'Bicycle Crunches', sets: 3, reps: '20-30', rest: '45s' },
      { name: 'Leg Raises', sets: 3, reps: '12-15', rest: '45s' }
    ]
  },
  cardio: {
    all: [
      { name: 'Running or Cycling', sets: 1, reps: '20-30 min', rest: 'N/A' },
      { name: 'Jump Rope', sets: 3, reps: '3 min', rest: '90s' },
      { name: 'Burpees', sets: 3, reps: '15-20', rest: '60s' },
      { name: 'Mountain Climbers', sets: 3, reps: '30-45s', rest: '60s' }
    ]
  }
};

function getEquipmentType(userData: UserData): 'gym' | 'dumbbells' | 'bodyweight' | 'all' {
  if (userData.equipment === 'Full Gym') return 'gym';
  if (userData.equipment === 'Dumbbells') return 'dumbbells';
  return 'bodyweight';
}

function adjustForExperience(exercises: Exercise[], level: string): Exercise[] {
  if (level === 'Beginner') {
    return exercises.map(ex => ({
      ...ex,
      sets: Math.max(2, ex.sets - 1)
    }));
  }
  if (level === 'Advanced') {
    return exercises.map(ex => ({
      ...ex,
      sets: ex.sets + 1
    }));
  }
  return exercises;
}

function getExercisesForMuscleGroup(muscleGroup: string, equipmentType: string): Exercise[] {
  const db = exerciseDatabase[muscleGroup as keyof typeof exerciseDatabase];
  if (!db) return [];

  if (muscleGroup === 'core' || muscleGroup === 'cardio') {
    return [...db.all];
  }

  return [...(db[equipmentType as keyof typeof db] || db.bodyweight)];
}

export function generateWorkoutPlan(userData: UserData): WorkoutPlan {
  const equipmentType = getEquipmentType(userData);
  const weeklyPlan: DayWorkout[] = [];

  const schedules = {
    3: ['chest_triceps', 'back_biceps', 'legs_shoulders'],
    4: ['chest_triceps', 'back_biceps', 'legs', 'shoulders_abs'],
    5: ['chest', 'back', 'legs', 'shoulders_arms', 'core_cardio'],
    6: ['chest', 'back', 'legs', 'shoulders', 'arms', 'core_cardio']
  };

  const schedule = schedules[userData.workoutDays as keyof typeof schedules] || schedules[4];

  schedule.forEach((dayType, index) => {
    let exercises: Exercise[] = [];
    let focus = '';

    if (dayType === 'chest_triceps') {
      focus = 'Chest & Triceps';
      const chestEx = getExercisesForMuscleGroup('chest', equipmentType).slice(0, 3);
      const tricepEx = getExercisesForMuscleGroup('arms', equipmentType).filter(e =>
        e.name.toLowerCase().includes('tricep')
      ).slice(0, 2);
      exercises = [...chestEx, ...tricepEx];
    } else if (dayType === 'back_biceps') {
      focus = 'Back & Biceps';
      const backEx = getExercisesForMuscleGroup('back', equipmentType).slice(0, 3);
      const bicepEx = getExercisesForMuscleGroup('arms', equipmentType).filter(e =>
        e.name.toLowerCase().includes('curl')
      ).slice(0, 2);
      exercises = [...backEx, ...bicepEx];
    } else if (dayType === 'legs_shoulders') {
      focus = 'Legs & Shoulders';
      const legEx = getExercisesForMuscleGroup('legs', equipmentType).slice(0, 3);
      const shoulderEx = getExercisesForMuscleGroup('shoulders', equipmentType).slice(0, 2);
      exercises = [...legEx, ...shoulderEx];
    } else if (dayType === 'chest') {
      focus = 'Chest';
      exercises = getExercisesForMuscleGroup('chest', equipmentType);
    } else if (dayType === 'back') {
      focus = 'Back';
      exercises = getExercisesForMuscleGroup('back', equipmentType);
    } else if (dayType === 'legs') {
      focus = 'Legs';
      exercises = getExercisesForMuscleGroup('legs', equipmentType);
    } else if (dayType === 'shoulders') {
      focus = 'Shoulders';
      exercises = getExercisesForMuscleGroup('shoulders', equipmentType);
    } else if (dayType === 'shoulders_arms') {
      focus = 'Shoulders & Arms';
      const shoulderEx = getExercisesForMuscleGroup('shoulders', equipmentType).slice(0, 2);
      const armEx = getExercisesForMuscleGroup('arms', equipmentType).slice(0, 3);
      exercises = [...shoulderEx, ...armEx];
    } else if (dayType === 'shoulders_abs') {
      focus = 'Shoulders & Core';
      const shoulderEx = getExercisesForMuscleGroup('shoulders', equipmentType).slice(0, 3);
      const coreEx = getExercisesForMuscleGroup('core', 'all').slice(0, 2);
      exercises = [...shoulderEx, ...coreEx];
    } else if (dayType === 'arms') {
      focus = 'Arms';
      exercises = getExercisesForMuscleGroup('arms', equipmentType);
    } else if (dayType === 'core_cardio') {
      focus = 'Core & Cardio';
      const coreEx = getExercisesForMuscleGroup('core', 'all');
      const cardioEx = getExercisesForMuscleGroup('cardio', 'all').slice(0, 2);
      exercises = [...coreEx, ...cardioEx];
    }

    exercises = adjustForExperience(exercises, userData.experienceLevel);

    weeklyPlan.push({
      day: `Day ${index + 1}`,
      focus,
      warmup: warmupExercises,
      exercises,
      cooldown: cooldownExercises
    });
  });

  return {
    userData,
    weeklyPlan
  };
}
