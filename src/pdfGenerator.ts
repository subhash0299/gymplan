import { jsPDF } from 'jspdf';
import { WorkoutPlan } from './types';
import { getExerciseHowTo } from './exerciseHowTo';

const NOTES = [
  'Stay hydrated before, during, and after training.',
  'Warm up properly; cool down and stretch after sessions.',
  'Prioritize good form over heavier loads.',
  'Rest days matter—sleep and nutrition support progress.',
  'Consult a qualified professional if you have health concerns before exercising.'
];

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return iso;
  }
}

export function generatePDF(plan: WorkoutPlan) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 20;
  const ud = plan.userData;
  const col1W = 40;

  doc.setFillColor(250, 250, 250);
  doc.rect(0, 0, pageWidth, pageH, 'F');
  doc.setFillColor(234, 88, 12);
  doc.rect(0, 0, pageWidth, 56, 'F');

  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('PERSONAL WORKOUT PLAN', pageWidth / 2, 40, { align: 'center' });

  let y = 78;
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Generated for', margin, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const displayName = ud.name.trim() || '—';
  doc.text(displayName, margin, y);
  y += 14;

  doc.setFont('helvetica', 'bold');
  doc.text('Goal:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(ud.fitnessGoal || '—', margin + 28, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Experience:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(ud.experienceLevel || '—', margin + 38, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Training days:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(ud.workoutDays), margin + 38, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Week layout:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(ud.scheduleRestDays ? '7-day calendar with rest days' : 'Workout days only', margin + 38, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Generated:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(fmtDate(plan.generatedAt), margin + 38, y);
  y += 10;

  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Plan summary', margin, y);
  y += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const est = plan.estimatedSessionMinutes;
  doc.text(
    `Estimated time: ${est.min}${est.min !== est.max ? `–${est.max}` : ''} minutes per workout session`,
    margin,
    y
  );
  y += 5;
  doc.text(`Difficulty: ${ud.experienceLevel || '—'}`, margin, y);
  y += 5;

  if (plan.bmi) {
    doc.text(`BMI: ${plan.bmi.value} (${plan.bmi.category})`, margin, y);
    y += 5;
  }

  const detailLines = [
    `Age: ${ud.age}`,
    `Height: ${ud.height} | Weight: ${ud.weight}`,
    `Location: ${ud.workoutLocation} | Equipment: ${ud.equipment}`
  ];
  detailLines.forEach((line) => {
    doc.text(line, margin, y);
    y += 4.5;
  });

  y += 6;
  doc.setDrawColor(200);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Weekly overview', margin, y);
  y += 8;

  const tableW = pageWidth - 2 * margin;
  doc.setFontSize(8);
  doc.setDrawColor(160);
  doc.setLineWidth(0.25);

  const headerH = 8;
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, y, tableW, headerH, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Day', margin + 3, y + 5.5);
  doc.text('Focus', margin + col1W + 3, y + 5.5);
  doc.line(margin + col1W, y, margin + col1W, y + headerH);
  y += headerH;

  doc.setFont('helvetica', 'normal');
  plan.weeklyPlan.forEach((day) => {
    if (y > pageH - 28) {
      doc.addPage();
      y = 20;
    }
    const focusLabel = day.kind === 'rest' ? 'Rest' : day.focus;
    const lines = doc.splitTextToSize(focusLabel, tableW - col1W - 6);
    const rowH = Math.max(7.5, 3.5 + lines.length * 4);
    doc.rect(margin, y, tableW, rowH, 'S');
    doc.line(margin + col1W, y, margin + col1W, y + rowH);
    doc.text(day.day, margin + 3, y + 5);
    lines.forEach((line: string, li: number) => {
      doc.text(line, margin + col1W + 3, y + 5 + li * 4);
    });
    y += rowH;
  });

  doc.addPage();
  y = 20;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - 18) {
      doc.addPage();
      y = 20;
    }
  };

  plan.weeklyPlan.forEach((day, dayIndex) => {
    if (dayIndex > 0) {
      doc.addPage();
      y = 20;
    }

    if (day.kind === 'rest') {
      doc.setFillColor(234, 88, 12);
      doc.rect(0, 0, pageWidth, 22, 'F');
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`${day.day} - Rest day`, margin, 14);

      y = 32;
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(day.focus, margin, y);
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(80);
      const noteLines = doc.splitTextToSize(day.restDayNote || '', pageWidth - 2 * margin);
      noteLines.forEach((line: string) => {
        doc.text(line, margin, y);
        y += 5;
      });
      return;
    }

    doc.setFillColor(234, 88, 12);
    doc.rect(0, 0, pageWidth, 24, 'F');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(`${day.day}: ${day.focus}`, margin, 15);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('How to perform each movement is below.', margin, 21);

    y = 34;

    doc.setTextColor(255, 87, 34);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Warm-up', margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50);
    doc.setFontSize(9);
    day.warmup.forEach((item) => {
      const lines = doc.splitTextToSize(`- ${item}`, pageWidth - 2 * margin - 4);
      lines.forEach((line: string) => {
        ensureSpace(5);
        doc.text(line, margin + 2, y);
        y += 4.5;
      });
    });

    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 87, 34);
    doc.setFontSize(11);
    doc.text('Main workout', margin, y);
    y += 7;

    day.exercises.forEach((exercise, exIndex) => {
      ensureSpace(28);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text(`${exIndex + 1}. ${exercise.name}`, margin, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text(`${exercise.sets} sets x ${exercise.reps} | Rest: ${exercise.rest}`, margin + 2, y);
      y += 5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text('How to:', margin + 2, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60);
      const howLines = doc.splitTextToSize(getExerciseHowTo(exercise.name), pageWidth - 2 * margin - 6);
      howLines.forEach((line: string) => {
        ensureSpace(4.5);
        doc.text(line, margin + 2, y);
        y += 4.5;
      });
      y += 5;
    });

    y += 4;
    ensureSpace(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 87, 34);
    doc.setFontSize(11);
    doc.text('Cool-down', margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50);
    doc.setFontSize(9);
    day.cooldown.forEach((item) => {
      const lines = doc.splitTextToSize(`- ${item}`, pageWidth - 2 * margin - 4);
      lines.forEach((line: string) => {
        ensureSpace(5);
        doc.text(line, margin + 2, y);
        y += 4.5;
      });
    });
  });

  doc.addPage();
  y = 20;

  doc.setFillColor(230, 240, 255);
  doc.rect(margin, y, pageWidth - 2 * margin, 52, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('Notes', margin + 4, y + 8);
  y += 14;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50);
  NOTES.forEach((note) => {
    const lines = doc.splitTextToSize(`• ${note}`, pageWidth - 2 * margin - 12);
    lines.forEach((line: string) => {
      doc.text(line, margin + 4, y);
      y += 5;
    });
  });

  doc.addPage();
  y = 24;
  doc.setFillColor(234, 88, 12);
  doc.rect(0, 0, pageWidth, 22, 'F');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Week 1 progress', pageWidth / 2, 14, { align: 'center' });

  y = 40;
  doc.setTextColor(0);
  doc.setFontSize(11);

  (['Weight', 'Chest', 'Waist'] as const).forEach((label) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin, y);
    doc.setDrawColor(120);
    doc.setLineWidth(0.3);
    doc.line(margin + 38, y + 1, pageWidth - margin, y + 1);
    y += 16;
  });

  doc.setFont('helvetica', 'bold');
  doc.text('Notes:', margin, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setDrawColor(120);
  for (let i = 0; i < 5; i++) {
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;
  }

  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text('Revisit your plan weekly and log changes to stay accountable.', margin, y + 6);

  doc.save('workout-plan.pdf');
}
