import type { UserData } from './types';

export interface BmiResult {
  value: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese';
}

export function parseHeightCm(raw: string): number | null {
  const s = raw.trim().toLowerCase();
  const cmMatch = s.match(/(\d+(?:\.\d+)?)\s*cm/);
  if (cmMatch) return parseFloat(cmMatch[1]);

  const ftIn = s.match(/(\d+)\s*['′]\s*(\d+(?:\.\d+)?)?/);
  if (ftIn) {
    const ft = parseInt(ftIn[1], 10);
    const inch = ftIn[2] ? parseFloat(ftIn[2]) : 0;
    return (ft * 12 + inch) * 2.54;
  }

  const mMatch = s.match(/^(\d+(?:\.\d+)?)\s*m\b/);
  if (mMatch) {
    const m = parseFloat(mMatch[1]);
    if (m >= 1 && m <= 2.5) return m * 100;
  }

  const n = parseFloat(s.replace(/,/g, '.'));
  if (Number.isNaN(n)) return null;
  if (n >= 100 && n <= 250) return n;
  if (n >= 1.4 && n <= 2.2) return n * 100;
  return null;
}

export function parseWeightKg(raw: string): number | null {
  const s = raw.trim().toLowerCase();
  const kg = s.match(/(\d+(?:\.\d+)?)\s*kg/);
  if (kg) return parseFloat(kg[1]);
  const lb = s.match(/(\d+(?:\.\d+)?)\s*(lbs?|pounds?)/);
  if (lb) return parseFloat(lb[1]) * 0.453592;

  const n = parseFloat(s.replace(/,/g, '.'));
  if (Number.isNaN(n)) return null;
  if (n > 130) return n * 0.453592;
  return n;
}

export function computeBmi(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  if (m <= 0) return NaN;
  return weightKg / (m * m);
}

export function bmiCategory(bmi: number): BmiResult['category'] {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function getBmiFromInputs(height: string, weight: string): BmiResult | null {
  const h = parseHeightCm(height);
  const w = parseWeightKg(weight);
  if (h === null || w === null || h <= 0 || w <= 0) return null;
  const value = Math.round(computeBmi(h, w) * 10) / 10;
  if (!Number.isFinite(value)) return null;
  return { value, category: bmiCategory(value) };
}

/** Non-prescriptive hint when BMI category and stated goal may align or differ */
export function getBmiGoalHint(
  bmi: { category: string } | null | undefined,
  goal: UserData['fitnessGoal']
): string | null {
  if (!bmi || !goal) return null;
  if (bmi.category === 'Underweight' && goal === 'Lose Fat') {
    return 'Your BMI is in the underweight range; fat loss may not be appropriate—consider discussing goals with a clinician.';
  }
  if ((bmi.category === 'Overweight' || bmi.category === 'Obese') && goal === 'Build Muscle') {
    return 'Many people in this BMI range still build muscle well; pairing training with nutrition supports both strength and body composition.';
  }
  if ((bmi.category === 'Overweight' || bmi.category === 'Obese') && goal === 'Stay Fit') {
    return 'General fitness plans work well; adding brisk walking or cycling on off days can support overall health.';
  }
  return null;
}
