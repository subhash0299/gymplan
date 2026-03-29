import { useState } from 'react';
import { UserData, WorkoutPlan } from './types';
import { generateWorkoutPlan } from './workoutGenerator';
import { generatePDF } from './pdfGenerator';
import MultiStepForm from './components/MultiStepForm';
import WorkoutPlanDisplay from './components/WorkoutPlanDisplay';
import { Dumbbell } from 'lucide-react';

function App() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

  const handleFormSubmit = (userData: UserData) => {
    const plan = generateWorkoutPlan(userData);
    setWorkoutPlan(plan);
  };

  const handleDownloadPDF = () => {
    if (workoutPlan) {
      generatePDF(workoutPlan);
    }
  };

  const handleStartOver = () => {
    setWorkoutPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {!workoutPlan ? (
          <>
            <header className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Dumbbell size={48} className="text-orange-500" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  Workout Planner
                </h1>
              </div>
              <p className="text-xl text-gray-600">
                Get your personalized workout plan in minutes
              </p>
            </header>
            <MultiStepForm onSubmit={handleFormSubmit} />
          </>
        ) : (
          <WorkoutPlanDisplay
            plan={workoutPlan}
            onDownloadPDF={handleDownloadPDF}
            onStartOver={handleStartOver}
          />
        )}
      </div>

      <footer className="text-center py-8 text-gray-500">
        <p>Built for your fitness journey</p>
      </footer>
    </div>
  );
}

export default App;
