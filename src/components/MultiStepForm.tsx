import { useState } from 'react';
import { UserData } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MultiStepFormProps {
  onSubmit: (data: UserData) => void;
}

export default function MultiStepForm({ onSubmit }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserData>({
    name: '',
    fitnessGoal: '',
    experienceLevel: '',
    workoutLocation: '',
    equipment: '',
    workoutDays: 4,
    scheduleRestDays: false,
    age: '',
    height: '',
    weight: ''
  });

  const totalSteps = 10;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return formData.fitnessGoal !== '';
      case 3:
        return formData.experienceLevel !== '';
      case 4:
        return formData.workoutLocation !== '';
      case 5:
        return formData.equipment !== '';
      case 6:
        return formData.workoutDays > 0;
      case 7:
        return true;
      case 8:
        return formData.age !== '';
      case 9:
        return formData.height !== '';
      case 10:
        return formData.weight !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What should we call you?</h2>
            <p className="text-gray-600 mb-6">Optional—used on your PDF cover.</p>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              autoComplete="name"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your fitness goal?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Build Muscle', 'Lose Fat', 'Gain Strength', 'Stay Fit'].map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setFormData({ ...formData, fitnessGoal: goal as UserData['fitnessGoal'] })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.fitnessGoal === goal
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <span className="text-lg font-semibold">{goal}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your experience level?</h2>
            <div className="grid grid-cols-1 gap-4">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, experienceLevel: level as UserData['experienceLevel'] })
                  }
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.experienceLevel === level
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <span className="text-lg font-semibold">{level}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Where will you workout?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Home', 'Gym'].map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, workoutLocation: location as UserData['workoutLocation'] })
                  }
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.workoutLocation === location
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <span className="text-lg font-semibold">{location}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What equipment do you have?</h2>
            <div className="grid grid-cols-1 gap-4">
              {['None', 'Dumbbells', 'Full Gym'].map((equipment) => (
                <button
                  key={equipment}
                  type="button"
                  onClick={() => setFormData({ ...formData, equipment: equipment as UserData['equipment'] })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.equipment === equipment
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <span className="text-lg font-semibold">{equipment}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How many training days per week?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[3, 4, 5, 6].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setFormData({ ...formData, workoutDays: days })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.workoutDays === days
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <span className="text-2xl font-bold">{days}</span>
                  <p className="text-sm text-gray-600 mt-1">days</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule rest days in your week?</h2>
            <p className="text-gray-600 mb-6">
              If yes, we spread your sessions across seven days with rest days between—more like a real calendar.
              If no, we list only your training days (Day 1, Day 2, …) with no rest entries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, scheduleRestDays: true })}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  formData.scheduleRestDays === true
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <span className="text-lg font-semibold">Yes</span>
                <p className="text-sm text-gray-600 mt-2">Show a 7-day week with rest days marked</p>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, scheduleRestDays: false })}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  formData.scheduleRestDays === false
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <span className="text-lg font-semibold">No</span>
                <p className="text-sm text-gray-600 mt-2">Only list my workout days</p>
              </button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How old are you?</h2>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter your age"
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              min="13"
              max="100"
            />
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your height?</h2>
            <input
              type="text"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              placeholder="e.g., 5'10'' or 178cm"
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
            />
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your weight?</h2>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="e.g., 180 lbs or 82 kg"
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">{renderStep()}</div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            canProceed()
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStep === totalSteps ? 'Generate plan' : 'Next'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
