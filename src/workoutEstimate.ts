import type { DayWorkout } from './types';

function parseRestSeconds(rest: string): number {
  const s = rest.toLowerCase();
  const m = s.match(/(\d+)\s*-\s*(\d+)\s*s/);
  if (m) return (parseInt(m[1], 10) + parseInt(m[2], 10)) / 2;
  const single = s.match(/(\d+)\s*s/);
  if (single) return parseInt(single[1], 10);
  if (s.includes('180') || s.includes('120-180')) return 150;
  if (s.includes('120')) return 120;
  if (s.includes('90')) return 90;
  if (s.includes('60')) return 60;
  if (s.includes('45')) return 45;
  if (s.includes('30')) return 30;
  if (s === 'n/a' || s.includes('n/a')) return 0;
  return 60;
}

/** Rough session length: warmup + work + rest between sets + cooldown */
export function estimateSingleSessionMinutes(day: DayWorkout): number {
  if (day.kind === 'rest') return 0;

  let minutes = 10 + day.warmup.length * 2;
  for (const ex of day.exercises) {
    const restSec = parseRestSeconds(ex.rest);
    const perSetMin = 0.75 + restSec / 60;
    minutes += ex.sets * perSetMin;
  }
  minutes += 6 + day.cooldown.length * 1.5;
  return Math.round(minutes);
}

export function estimateSessionRange(workoutDays: DayWorkout[]): { min: number; max: number } {
  const vals = workoutDays.filter((d) => d.kind !== 'rest').map(estimateSingleSessionMinutes);
  if (vals.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...vals), max: Math.max(...vals) };
}
