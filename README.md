# Gymplan

A web app that builds a **personalized weekly workout plan** from a short questionnaire, shows it on screen, and exports a **printable PDF** (cover page, summary, weekly overview, one page per training day with form cues, notes, and a progress tracker).

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS**
- **jsPDF** (PDF export)
- **lucide-react** (icons)

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other commands

| Command | Description |
|--------|-------------|
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run lint` | Run ESLint |

## What you can configure

The multi-step form collects goals, experience, location, equipment, training days per week, optional **scheduled rest days** in a 7-day week, body stats (for BMI), and an optional **name** for the PDF cover.

The **workout engine** (`src/workoutGenerator.ts`) turns that into a weekly schedule, applies goal-based rep/rest rules, resolves **home vs gym** equipment, and can expand the week with **rest days**. **Regenerate** shuffles variation while keeping the same inputs.

**How-to text** for each exercise lives in `src/exerciseHowTo.ts` and is shown in the UI and PDF.

## Project layout (high level)

- `src/App.tsx` — Shell and plan state
- `src/components/` — `MultiStepForm`, `WorkoutPlanDisplay`
- `src/workoutGenerator.ts` — Plan generation
- `src/pdfGenerator.ts` — PDF layout
- `src/bmi.ts` — BMI parsing and hints
- `src/exerciseIcons.ts` — Emoji icons for the web UI only

## PDF notes

Built-in PDF fonts are **Latin-only**; exercise names and copy in the PDF avoid emoji and stick to WinAnsi-safe text so labels render reliably in viewers.
