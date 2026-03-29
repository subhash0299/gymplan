import { WorkoutPlan } from '../types';
import { Download, Dumbbell } from 'lucide-react';

interface WorkoutPlanDisplayProps {
  plan: WorkoutPlan;
  onDownloadPDF: () => void;
  onStartOver: () => void;
}

export default function WorkoutPlanDisplay({ plan, onDownloadPDF, onStartOver }: WorkoutPlanDisplayProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Dumbbell size={40} />
          <h1 className="text-4xl font-bold">Your Personal Workout Plan</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm opacity-90">Days/Week</p>
            <p className="font-bold text-lg">{plan.userData.workoutDays} days</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={onDownloadPDF}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
        >
          <Download size={24} />
          Download as PDF
        </button>
        <button
          onClick={onStartOver}
          className="px-6 py-4 rounded-xl font-bold text-lg border-2 border-gray-300 hover:border-gray-400 transition-all"
        >
          Start Over
        </button>
      </div>

      <div className="space-y-6">
        {plan.weeklyPlan.map((day, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                <h3 className="font-bold text-lg mb-3 text-orange-600">Main Workout</h3>
                <div className="space-y-3">
                  {day.exercises.map((exercise, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          Rest: {exercise.rest}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">
                        {exercise.sets} sets × {exercise.reps} reps
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
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mt-8">
        <h3 className="font-bold text-lg mb-3 text-blue-900">Important Notes</h3>
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
