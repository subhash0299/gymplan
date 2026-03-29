/** Emoji prefix for UI/PDF (PDF rendering depends on viewer font support) */
export function getExerciseIcon(name: string): string {
  const n = name.toLowerCase();

  if (n.includes('push') || n.includes('bench') || n.includes('fly') || n.includes('dip')) return '🏋️';
  if (n.includes('squat') || n.includes('lunge') || n.includes('leg press') || n.includes('goblet')) return '🔥';
  if (n.includes('pull') || n.includes('row') || n.includes('lat ') || n.includes('chin')) return '💪';
  if (n.includes('deadlift') || n.includes('rdl') || n.includes('romanian')) return '⚡';
  if (n.includes('curl')) return '💪';
  if (n.includes('tricep') || n.includes('extension') || n.includes('pushdown')) return '🏋️';
  if (n.includes('plank') || n.includes('crunch') || n.includes('core') || n.includes('russian')) return '🧘';
  if (n.includes('run') || n.includes('cycl') || n.includes('jump rope') || n.includes('burpee') || n.includes('mountain')) return '❤️';
  if (n.includes('press') || n.includes('raise') || n.includes('shoulder')) return '🏋️';
  if (n.includes('calf')) return '👟';

  return '✓';
}
