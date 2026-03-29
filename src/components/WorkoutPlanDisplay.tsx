import { WorkoutPlan } from '../types';
import { Download, Dumbbell, RefreshCw } from 'lucide-react';
import { getBmiGoalHint } from '../bmi';
import { getExerciseIcon } from '../exerciseIcons';
import { getExerciseHowTo } from '../exerciseHowTo';

interface WorkoutPlanDisplayProps {
  plan: WorkoutPlan;
  onDownloadPDF: () => void;
  onRegenerate: () => void;
  onStartOver: () => void;
}

export default function WorkoutPlanDisplay({
  plan,
  onDownloadPDF,
  onRegenerate,
  onStartOver
}: WorkoutPlanDisplayProps) {
  const level = plan.userData.experienceLevel;
  const bmiHint = getBmiGoalHint(plan.bmi, plan.userData.fitnessGoal);
  const est = plan.estimatedSessionMinutes;
  const timeLabel =
    est.min === est.max ? `${est.min} minutes` : `${est.min}–${est.max} minutes`;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Dumbbell size={40} />
            <div>
              <h1 className="text-4xl font-bold">Your Personal Workout Plan</h1>
              {plan.userData.name.trim() ? (
                <p className="text-lg opacity-95 mt-1">Hi, {plan.userData.name.trim()}</p>
              ) : null}
            </div>
          </div>
          {level ? (
            <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide">
              {level} plan
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">Est. session time</p>
            <p className="font-bold text-lg">{timeLabel}</p>
            <p className="text-xs opacity-80 mt-1">Per workout day (approx.)</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">Difficulty</p>
            <p className="font-bold text-lg">{plan.userData.experienceLevel || '—'}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">Week layout</p>
            <p className="font-bold text-lg">
              {plan.userData.scheduleRestDays ? '7-day with rests' : 'Training days only'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">Goal</p>
            <p className="font-bold text-lg">{plan.userData.fitnessGoal}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">Level</p>
            <p className="font-bold text-lg">{plan.userData.experienceLevel}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">Location</p>
            <p className="font-bold text-lg">{plan.userData.workoutLocation}</p>
            <p className="text-xs opacity-80 mt-1">
              {plan.userData.workoutLocation === 'Home'
                ? 'Bodyweight or dumbbells (no cable machines).'
                : 'Equipment matches what you selected.'}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">Training days / week</p>
            <p className="font-bold text-lg">{plan.userData.workoutDays} days</p>
          </div>
        </div>

        {plan.bmi ? (
          <div className="mt-6 rounded-xl bg-white/15 p-4 text-left">
            <p className="text-sm opacity-90">BMI</p>
            <p className="text-xl font-bold">
              {plan.bmi.value} <span className="text-base font-normal opacity-90">({plan.bmi.category})</span>
            </p>
            {bmiHint ? <p className="mt-2 text-sm opacity-95 leading-relaxed">{bmiHint}</p> : null}
          </div>
        ) : (
          <p className="mt-6 text-sm opacity-80">
            Add height and weight using units (e.g. 178 cm, 82 kg) to see BMI on your plan and PDF.
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          type="button"
          onClick={onDownloadPDF}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
        >
          <Download size={24} />
          Download as PDF
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-orange-400 text-orange-700 px-6 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all"
        >
          <RefreshCw size={24} />
          Generate another plan
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="px-6 py-4 rounded-xl font-bold text-lg border-2 border-gray-300 hover:border-gray-400 transition-all sm:w-auto"
        >
          Start over
        </button>
      </div>

      <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-semibold text-gray-900 w-28">Day</th>
              <th className="px-4 py-3 font-semibold text-gray-900">Focus</th>
            </tr>
          </thead>
          <tbody>
            {plan.weeklyPlan.map((day, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-800">{day.day}</td>
                <td className="px-4 py-3 text-gray-700">
                  {day.kind === 'rest' ? (
                    <span className="text-gray-500 italic">Rest</span>
                  ) : (
                    <span>{day.focus}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-6">
        {plan.weeklyPlan.map((day, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {day.kind === 'rest' ? (
              <>
                <div className="bg-gradient-to-r from-slate-500 to-slate-600 text-white p-6">
                  <h2 className="text-2xl font-bold">{day.day}</h2>
                  <p className="text-lg opacity-90">{day.focus}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">{day.restDayNote}</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                  <h2 className="text-2xl font-bold">{day.day}</h2>
                  <p className="text-lg opacity-90">{day.focus}</p>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-orange-600">Warm-up</h3>
                    <ul className="space-y-2">
                      {day.warmup.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3 text-orange-600">Main workout</h3>
                    <div className="space-y-3">
                      {day.exercises.map((exercise, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-semibold text-gray-900">
                              <span className="mr-2" aria-hidden>
                                {getExerciseIcon(exercise.name)}
                              </span>
                              {exercise.name}
                            </h4>
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded shrink-0">
                              Rest: {exercise.rest}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                          <p className="text-sm text-gray-600 mt-3 leading-relaxed border-t border-gray-200 pt-3">
                            <span className="font-semibold text-gray-800">How to: </span>
                            {getExerciseHowTo(exercise.name)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3 text-orange-600">Cool-down</h3>
                    <ul className="space-y-2">
                      {day.cooldown.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mt-8">
        <h3 className="font-bold text-lg mb-3 text-blue-900">Important notes</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Always warm up before starting your workout to prevent injuries</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Focus on proper form over heavy weights</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Stay hydrated throughout your workout</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Rest and recovery are just as important as training</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Consult a healthcare professional before starting any new exercise program</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
