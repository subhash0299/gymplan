/**
 * Short form cues for each exercise (ASCII-safe for jsPDF built-in fonts).
 */
const HOW_TO: Record<string, string> = {
  'Barbell Bench Press':
    'Retract shoulder blades on the bench. Lower the bar to mid-chest with control, then press up and slightly back toward the rack.',
  'Incline Dumbbell Press':
    'Set bench to 30-45 degrees. Press dumbbells up without letting elbows flare wide; lower until you feel a stretch in the upper chest.',
  'Cable Flyes':
    'Slight bend in elbows fixed. Bring handles together in front of the chest in an arc; control the stretch on the way back.',
  Dips:
    'Lean torso slightly forward for chest emphasis. Lower until shoulders feel comfortable, then drive up without shrugging.',
  'Dumbbell Bench Press':
    'Feet planted, slight arch if comfortable. Press dumbbells over chest; lower until upper arms about parallel to the floor.',
  'Dumbbell Flyes':
    'Soft elbows. Open wide with control, then squeeze chest to bring weights together over the sternum.',
  'Push-ups':
    'Hands under shoulders, body straight from head to heels. Lower chest toward floor, press floor away to lock out.',
  'Wide Push-ups':
    'Hands wider than shoulders. Keep core tight; lower with elbows tracking about 45 degrees from body.',
  'Diamond Push-ups':
    'Hands close forming a diamond under chest. Elbows stay close to ribs; full range without sagging hips.',
  'Decline Push-ups':
    'Feet elevated, hands on floor. Same rigid plank; emphasize upper chest by pressing through palms.',

  'Pull-ups':
    'Hang with full grip, depress shoulders slightly. Pull chest toward bar, elbows toward ribs; lower with control.',
  'Barbell Rows':
    'Hinge at hips, flat back. Pull bar to lower ribs, squeeze shoulder blades; avoid jerking with momentum.',
  'Lat Pulldowns':
    'Grip slightly outside shoulders. Pull bar toward upper chest, elbows point down; resist the stack on the way up.',
  'Cable Rows':
    'Sit tall, slight knee bend. Pull handle to lower ribs; pause, squeeze back, then extend arms without rounding hard.',
  'Dumbbell Rows':
    'One hand and knee on bench for support. Row dumbbell toward hip, elbow skimming your side.',
  'Renegade Rows':
    'Plank on dumbbells, feet wide. Row one weight at a time without rotating hips; alternate sides.',
  'Reverse Flyes':
    'Bent over, soft elbows. Open arms wide, squeeze rear shoulders; use light weight and strict form.',
  Pullover:
    'On bench, dumbbell over chest. Lower in an arc behind head with slight elbow bend; pull back using chest and lats.',
  'Pull-ups (or Assisted)':
    'Use band or machine if needed. Same pulling path: chest up, full range, no kipping unless programmed.',
  'Inverted Rows':
    'Body straight under bar or rings. Pull chest to bar, squeeze shoulder blades; adjust height to match strength.',
  'Superman Holds':
    'Lie face down, lift chest and thighs off floor, arms forward or back. Hold; breathe steadily.',
  'Reverse Snow Angels':
    'Face down, arms overhead. Slide arms out and down toward hips in a wide arc without lifting feet.',

  'Barbell Squats':
    'Bar on upper back, brace core. Sit hips back and down to depth you own; knees track over toes; drive up evenly.',
  'Romanian Deadlifts':
    'Soft knees fixed. Hinge hips back, bar close to legs; feel hamstring stretch, then drive hips forward to stand.',
  'Leg Press':
    'Feet shoulder-width on platform. Lower under control without butt lifting; press without locking knees aggressively.',
  'Leg Curls':
    'Pad snug on lower legs. Curl heels toward glutes; pause at top, lower slowly without swinging.',
  'Calf Raises':
    'Stand tall on balls of feet. Rise as high as possible, pause, lower until calves stretch.',
  'Goblet Squats':
    'Hold dumbbell at chest. Squat between hips and knees, elbows inside knees at bottom; keep torso tall.',
  'Dumbbell Romanian Deadlifts':
    'Dumbbells in front of thighs. Hip hinge with flat back; lower until hamstrings limit you, then stand tall.',
  'Bulgarian Split Squats':
    'Rear foot elevated. Lower straight down; front knee tracks over ankle; drive through front heel.',
  'Dumbbell Lunges':
    'Step forward into lunge, both knees bend ~90 degrees. Push back to start; alternate legs.',
  'Single-Leg Calf Raises':
    'Balance on one foot on edge of step. Full stretch at bottom, full squeeze at top; switch sides.',
  'Bodyweight Squats':
    'Feet shoulder-width. Sit hips down between knees; chest up; drive through mid-foot to stand.',
  'Jump Squats':
    'Squat then explode up softly. Land with soft knees; use for power, not max fatigue sloppy reps.',
  Lunges:
    'Step length so front shin stays roughly vertical. Torso tall; alternate or walk as programmed.',
  'Single-Leg Deadlifts':
    'Hinge on one leg, free leg extends back. Hips square; move slow; use wall touch for balance if needed.',
  'Wall Sits':
    'Back flat on wall, thighs parallel if possible. Hold; breathe; slide up if form breaks.',

  'Overhead Press':
    'Bar or dumbbells at shoulders, core tight. Press straight up, head through at top; no excessive arch.',
  'Lateral Raises':
    'Slight bend in elbows. Raise arms to shoulder height with control; lower slowly; avoid shrugging.',
  'Front Raises':
    'Lift weights forward to shoulder height with soft elbows; control the negative.',
  'Face Pulls':
    'Rope at upper chest height. Pull toward face, elbows high, squeeze upper back; resist forward.',
  'Dumbbell Shoulder Press':
    'Seated or standing, core braced. Press overhead without flaring ribs; full range without pain.',
  'Bent-Over Lateral Raises':
    'Torso bent, raise arms out to the side; small weights, strict rear-delt focus.',
  'Pike Push-ups':
    'Hips high, hands on floor. Bend elbows lowering head toward hands; press back to pike.',
  'Handstand Hold (Wall)':
    'Kick up to wall, body in line. Push tall through shoulders; breathe; bail safely if needed.',
  'Plank to Down Dog':
    'Flow from plank to hips up, lengthen spine; move smoothly with control.',
  'Arm Circles':
    'Small to large circles forward and back; keep shoulders relaxed away from ears.',

  'Barbell Curls':
    'Elbows fixed at sides. Curl without swinging torso; squeeze biceps at top, lower slowly.',
  'Tricep Pushdowns':
    'Elbows pinned to sides. Extend fully at bottom without leaning forward; control return.',
  'Hammer Curls':
    'Neutral grip. Curl without rotating; keeps tension on brachialis and biceps.',
  'Overhead Tricep Extension':
    'Elbows point up, weight behind head. Extend arms without flaring elbows wide.',
  'Dumbbell Curls':
    'Alternate or together; no hip swing; full extension at bottom each rep.',
  'Tricep Kickbacks':
    'Hinge forward, upper arm parallel to floor. Extend forearm back until arm straight; squeeze triceps.',
  'Close-Grip Push-ups':
    'Hands narrower than shoulders. Elbows skim ribs; full range with rigid plank.',
  'Tricep Dips (Chair)':
    'Hands on edge, legs bent or straight. Lower until comfortable shoulder stretch; press up without shrugging.',
  'Chin-ups':
    'Supinated grip. Pull chest to bar, biceps help; lower with control.',

  Plank:
    'Forearms or hands, body rigid. Squeeze glutes and quads; breathe; keep hips level.',
  'Russian Twists':
    'Lean back slightly, feet up or down. Rotate torso side to side with control; move from ribs, not arms only.',
  'Bicycle Crunches':
    'Shoulder blades off floor. Alternate elbow to opposite knee in a slow pedaling motion.',
  'Leg Raises':
    'Lie on back or hanging. Lift legs with control; avoid arching low back excessively.',

  'Running or Cycling':
    'Easy warm-up pace first. Steady breathing; if cycling, adjust resistance for continuous effort.',
  'Jump Rope':
    'Small hops, wrists turn rope. Land softly; stay tall; short sessions if new to jumping.',
  Burpees:
    'Hands to floor, jump or step back, optional push-up, jump or stand up. Smooth transitions.',
  'Mountain Climbers':
    'Plank position, drive knees toward chest alternately. Hips low; pace matches your conditioning.'
};

const DEFAULT_HOW_TO =
  'Brace your core, move through a full comfortable range of motion, and stop if you feel sharp pain.';

export function getExerciseHowTo(exerciseName: string): string {
  return HOW_TO[exerciseName] ?? DEFAULT_HOW_TO;
}
