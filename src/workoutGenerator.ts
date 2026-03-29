import { UserData, WorkoutPlan, DayWorkout, Exercise } from './types';
import { getBmiFromInputs } from './bmi';
import { estimateSessionRange } from './workoutEstimate';

function getWorkoutIndicesInWeek(w: number): number[] {
  if (w <= 0) return [];
  if (w === 1) return [3];
  return Array.from({ length: w }, (_, i) => Math.round((i * 6) / (w - 1)));
}

/** Map training sessions into a 7-day week with rest on off days */
function expandTrainingDaysIntoWeek(workouts: DayWorkout[]): DayWorkout[] {
  const w = workouts.length;
  const positions = getWorkoutIndicesInWeek(w);
  const out: DayWorkout[] = [];
  let wi = 0;
  for (let d = 0; d < 7; d++) {
    if (positions.includes(d)) {
      const block = workouts[wi++];
      out.push({
        ...block,
        day: `Day ${d + 1}`,
        kind: 'workout'
      });
    } else {
      out.push({
        day: `Day ${d + 1}`,
        kind: 'rest',
        focus: 'Rest & recovery',
        warmup: [],
        exercises: [],
        cooldown: [],
        restDayNote:
          'Full rest, or light walking, mobility, or stretching. Prioritize sleep and hydration.'
      });
    }
  }
  return out;
}

const warmupBase = [
  '5-10 minutes light cardio (jogging, jumping jacks, or cycling)',
  'Dynamic stretching (arm circles, leg swings)',
  'Mobility exercises for target muscle groups'
];

const warmupFatLoss = [
  '8-12 minutes brisk walking, jumping jacks, or light jog to raise heart rate',
  'Dynamic stretching (leg swings, arm circles)',
  '2-3 rounds: bodyweight squats × 10, inchworms × 8'
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

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Home training never uses commercial gym machines; cap at dumbbells or bodyweight. */
function getEffectiveEquipment(userData: UserData): 'gym' | 'dumbbells' | 'bodyweight' {
  if (userData.workoutLocation === 'Home') {
    if (userData.equipment === 'Dumbbells' || userData.equipment === 'Full Gym') return 'dumbbells';
    return 'bodyweight';
  }
  if (userData.equipment === 'Full Gym') return 'gym';
  if (userData.equipment === 'Dumbbells') return 'dumbbells';
  return 'bodyweight';
}

function adjustForExperience(exercises: Exercise[], level: string): Exercise[] {
  if (level === 'Beginner') {
    return exercises.map((ex) => ({
      ...ex,
      sets: Math.max(2, ex.sets - 1)
    }));
  }
  if (level === 'Advanced') {
    return exercises.map((ex) => ({
      ...ex,
      sets: ex.sets + 1
    }));
  }
  return exercises;
}

function getExercisesForMuscleGroup(muscleGroup: string, equipmentType: string): Exercise[] {
  if (muscleGroup === 'core') {
    return [...exerciseDatabase.core.all];
  }
  if (muscleGroup === 'cardio') {
    return [...exerciseDatabase.cardio.all];
  }

  const db = exerciseDatabase[muscleGroup as 'chest' | 'back' | 'legs' | 'shoulders' | 'arms'];
  if (!db) return [];

  const key = equipmentType as 'gym' | 'dumbbells' | 'bodyweight';
  return [...(db[key] || db.bodyweight)];
}

function isCompound(name: string): boolean {
  const l = name.toLowerCase();
  return (
    l.includes('squat') ||
    l.includes('deadlift') ||
    l.includes('bench') ||
    l.includes('press') ||
    l.includes('row') ||
    l.includes('pull-up') ||
    l.includes('pull up') ||
    l.includes('lunge') ||
    l.includes('leg press')
  );
}

/** Steady-state or long-duration cardio lines keep time-based reps */
function isDurationCardio(ex: Exercise): boolean {
  return ex.reps.toLowerCase().includes('min');
}

function applyGoalToExercises(exercises: Exercise[], goal: UserData['fitnessGoal']): Exercise[] {
  if (!goal) return exercises;

  if (goal === 'Build Muscle') {
    return exercises.map((ex) => {
      if (isDurationCardio(ex)) {
        return { ...ex, rest: '60-90s' };
      }
      return {
        ...ex,
        reps: '8-12',
        rest: '60-90s',
        sets: ex.sets + 1
      };
    });
  }

  if (goal === 'Lose Fat') {
    return exercises.map((ex) => {
      if (isDurationCardio(ex)) {
        return { ...ex, reps: '25-40 min', rest: ex.rest };
      }
      return {
        ...ex,
        reps: '12-15',
        rest: '30-45s'
      };
    });
  }

  if (goal === 'Gain Strength') {
    return exercises.map((ex) => {
      if (isDurationCardio(ex)) return ex;
      const compound = isCompound(ex.name);
      return {
        ...ex,
        reps: compound ? '3-6' : '6-10',
        rest: compound ? '120-180s' : '90-120s'
      };
    });
  }

  if (goal === 'Stay Fit') {
    return exercises.map((ex) => {
      if (isDurationCardio(ex)) {
        return { ...ex, reps: '20-30 min', rest: ex.rest };
      }
      return {
        ...ex,
        reps: '10-15',
        rest: '45-60s'
      };
    });
  }

  return exercises;
}

type DayType = string;

function getSchedule(goal: UserData['fitnessGoal'], days: number): DayType[] {
  const defaultSchedules: Record<number, DayType[]> = {
    3: ['chest_triceps', 'back_biceps', 'legs_shoulders'],
    4: ['chest_triceps', 'back_biceps', 'legs', 'shoulders_abs'],
    5: ['chest', 'back', 'legs', 'shoulders_arms', 'core_cardio'],
    6: ['chest', 'back', 'legs', 'shoulders', 'arms', 'core_cardio']
  };

  if (goal === 'Stay Fit') {
    return Array.from({ length: days }, () => 'full_body');
  }

  if (goal === 'Build Muscle' && days === 5) {
    return ['chest_triceps', 'back_biceps', 'legs', 'shoulders', 'arms'];
  }

  return defaultSchedules[days] || defaultSchedules[4];
}

function takeShuffled(list: Exercise[], n: number, mix: number): Exercise[] {
  if (list.length === 0) return [];
  return shuffle(list, mix).slice(0, Math.min(n, list.length));
}

function buildDayExercises(
  dayType: DayType,
  equipmentType: 'gym' | 'dumbbells' | 'bodyweight',
  goal: UserData['fitnessGoal'],
  seed: number,
  dayIndex: number
): { exercises: Exercise[]; focus: string } {
  let exercises: Exercise[] = [];
  let focus = '';
  const baseMix = seed + dayIndex * 1009 + dayType.length * 17;

  if (dayType === 'full_body') {
    focus = 'Full Body (balanced)';
    exercises = [
      ...takeShuffled(getExercisesForMuscleGroup('legs', equipmentType), 2, baseMix + 1),
      ...takeShuffled(getExercisesForMuscleGroup('chest', equipmentType), 1, baseMix + 2),
      ...takeShuffled(getExercisesForMuscleGroup('back', equipmentType), 1, baseMix + 3),
      ...takeShuffled(getExercisesForMuscleGroup('shoulders', equipmentType), 1, baseMix + 4),
      ...takeShuffled(getExercisesForMuscleGroup('core', 'all'), 2, baseMix + 5)
    ];
  } else if (dayType === 'chest_triceps') {
    focus = 'Chest & Triceps';
    const chestEx = takeShuffled(getExercisesForMuscleGroup('chest', equipmentType), 3, baseMix + 11);
    const tricepEx = takeShuffled(
      getExercisesForMuscleGroup('arms', equipmentType).filter((e) =>
        e.name.toLowerCase().includes('tricep')
      ),
      2,
      baseMix + 12
    );
    exercises = [...chestEx, ...tricepEx];
  } else if (dayType === 'back_biceps') {
    focus = 'Back & Biceps';
    const backEx = takeShuffled(getExercisesForMuscleGroup('back', equipmentType), 3, baseMix + 21);
    const bicepEx = takeShuffled(
      getExercisesForMuscleGroup('arms', equipmentType).filter((e) =>
        e.name.toLowerCase().includes('curl')
      ),
      2,
      baseMix + 22
    );
    exercises = [...backEx, ...bicepEx];
  } else if (dayType === 'legs_shoulders') {
    focus = 'Legs & Shoulders';
    exercises = [
      ...takeShuffled(getExercisesForMuscleGroup('legs', equipmentType), 3, baseMix + 31),
      ...takeShuffled(getExercisesForMuscleGroup('shoulders', equipmentType), 2, baseMix + 32)
    ];
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
    exercises = [
      ...takeShuffled(getExercisesForMuscleGroup('shoulders', equipmentType), 2, baseMix + 41),
      ...takeShuffled(getExercisesForMuscleGroup('arms', equipmentType), 3, baseMix + 42)
    ];
  } else if (dayType === 'shoulders_abs') {
    focus = 'Shoulders & Core';
    exercises = [
      ...takeShuffled(getExercisesForMuscleGroup('shoulders', equipmentType), 3, baseMix + 51),
      ...takeShuffled(getExercisesForMuscleGroup('core', 'all'), 2, baseMix + 52)
    ];
  } else if (dayType === 'arms') {
    focus = 'Arms';
    exercises = getExercisesForMuscleGroup('arms', equipmentType);
  } else if (dayType === 'core_cardio') {
    focus = 'Core & Cardio';
    exercises = [
      ...getExercisesForMuscleGroup('core', 'all'),
      ...takeShuffled(getExercisesForMuscleGroup('cardio', 'all'), 2, baseMix + 61)
    ];
  }

  exercises = shuffle(exercises, seed + dayIndex * 17);

  if (goal === 'Lose Fat') {
    const cardioPool = shuffle(getExercisesForMuscleGroup('cardio', 'all'), seed + 401 + dayIndex);
    exercises = [...exercises, ...cardioPool.slice(0, 2)];
  }

  return { exercises, focus };
}

export interface GenerateOptions {
  seed?: number;
}

export function generateWorkoutPlan(userData: UserData, options: GenerateOptions = {}): WorkoutPlan {
  const seed = options.seed ?? Math.floor(Math.random() * 1e9);
  const equipmentType = getEffectiveEquipment(userData);
  const schedule = getSchedule(userData.fitnessGoal, userData.workoutDays);

  let weeklyPlan: DayWorkout[] = [];

  schedule.forEach((dayType, index) => {
    const { exercises: rawList, focus } = buildDayExercises(
      dayType,
      equipmentType,
      userData.fitnessGoal,
      seed,
      index
    );

    let exercises = adjustForExperience(rawList, userData.experienceLevel);
    exercises = applyGoalToExercises(exercises, userData.fitnessGoal);

    const warmup =
      userData.fitnessGoal === 'Lose Fat' ? warmupFatLoss : warmupBase;

    weeklyPlan.push({
      day: `Day ${index + 1}`,
      kind: 'workout',
      focus,
      warmup,
      exercises,
      cooldown: cooldownExercises
    });
  });

  if (userData.scheduleRestDays) {
    weeklyPlan = expandTrainingDaysIntoWeek(weeklyPlan);
  }

  const bmi = getBmiFromInputs(userData.height, userData.weight);
  const estimatedSessionMinutes = estimateSessionRange(weeklyPlan);

  return {
    userData,
    weeklyPlan,
    bmi: bmi ? { value: bmi.value, category: bmi.category } : null,
    seed,
    estimatedSessionMinutes,
    generatedAt: new Date().toISOString()
  };
}
