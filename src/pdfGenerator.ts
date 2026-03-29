import { jsPDF } from 'jspdf';
import { WorkoutPlan } from './types';

export function generatePDF(plan: WorkoutPlan) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Personal Workout Plan', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text('Generated for your fitness journey', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;

  doc.setDrawColor(255, 87, 34);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Your Details', margin, yPosition);

  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Goal: ${plan.userData.fitnessGoal}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Experience Level: ${plan.userData.experienceLevel}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Workout Location: ${plan.userData.workoutLocation}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Equipment: ${plan.userData.equipment}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Days per Week: ${plan.userData.workoutDays}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Age: ${plan.userData.age} | Height: ${plan.userData.height} | Weight: ${plan.userData.weight}`, margin, yPosition);

  yPosition += 12;

  plan.weeklyPlan.forEach((day, dayIndex) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFillColor(50, 50, 50);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 12, 'F');

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(`${day.day}: ${day.focus}`, margin + 5, yPosition + 8);

    yPosition += 18;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 87, 34);
    doc.text('Warm-up:', margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50);
    day.warmup.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, pageWidth - 2 * margin - 5);
      lines.forEach((line: string) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin + 3, yPosition);
        yPosition += 5;
      });
    });

    yPosition += 5;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 87, 34);
    doc.text('Main Workout:', margin, yPosition);
    yPosition += 6;

    day.exercises.forEach((exercise) => {
      if (yPosition > 265) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0);
      doc.text(exercise.name, margin + 3, yPosition);
      yPosition += 5;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80);
      doc.text(`${exercise.sets} sets × ${exercise.reps} reps | Rest: ${exercise.rest}`, margin + 3, yPosition);
      yPosition += 7;
    });

    yPosition += 3;

    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 87, 34);
    doc.text('Cool-down:', margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50);
    day.cooldown.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, pageWidth - 2 * margin - 5);
      lines.forEach((line: string) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin + 3, yPosition);
        yPosition += 5;
      });
    });

    yPosition += 8;

    if (dayIndex < plan.weeklyPlan.length - 1) {
      doc.setDrawColor(200);
      doc.setLineWidth(0.3);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
    }
  });

  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition += 10;
  doc.setFillColor(230, 240, 255);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'F');

  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('Important Notes:', margin + 5, yPosition);
  yPosition += 7;

  const notes = [
    'Always warm up before starting your workout to prevent injuries',
    'Focus on proper form over heavy weights',
    'Stay hydrated throughout your workout',
    'Rest and recovery are just as important as training',
    'Consult a healthcare professional before starting any new exercise program'
  ];

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50);
  notes.forEach((note) => {
    const lines = doc.splitTextToSize(`• ${note}`, pageWidth - 2 * margin - 10);
    lines.forEach((line: string) => {
      doc.text(line, margin + 5, yPosition);
      yPosition += 5;
    });
  });

  doc.save('workout-plan.pdf');
}
