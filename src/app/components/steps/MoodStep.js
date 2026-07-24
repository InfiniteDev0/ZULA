import { useEffect } from "react";
import { MOODS } from "../../data/menu";
import MoodFace from "../ui/MoodFace";

// Node coordinates along the curved arc — B(t) of a quadratic bezier
// M30 40 Q160 110 290 40, sampled at t = 0, .25, .5, .75, 1.
const DOTS = [
  [30, 40],
  [95, 66],
  [160, 75],
  [225, 66],
  [290, 40],
];
const DEFAULT_INDEX = 2; // start centred (Calm)

// Step 1 — one screen that morphs its whole theme to the chosen mood.
export default function MoodStep({ firstName, selected, onPick, onNext }) {
  // Land on a default mood so the screen is never blank.
  useEffect(() => {
    if (!selected) onPick(MOODS[DEFAULT_INDEX].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const found = selected ? MOODS.findIndex((m) => m.id === selected) : -1;
  const activeIndex = found < 0 ? DEFAULT_INDEX : found;
  const mood = MOODS[activeIndex];

  return (
    <section className="animate-rise">
      <div
        className="rounded-[2.5rem] px-6 pt-9 pb-6 min-h-[78vh] flex flex-col
          justify-between transition-colors duration-500 shadow-2xl shadow-black/40"
        style={{ backgroundColor: mood.color }}
      >
        {/* Greeting */}
        <div className="text-center" style={{ color: mood.ink }}>
          <p className="text-sm font-medium mb-2">👋 Hey {firstName}!</p>
          <h2 className="font-display text-3xl leading-tight">
            How are you feeling
            <br />
            this day?
          </h2>
        </div>

        {/* Face + label */}
        <div className="flex flex-col items-center gap-5">
          <MoodFace
            key={mood.id}
            variant={mood.face}
            bg={mood.faceBg}
            ink={mood.faceInk}
            className="w-40 h-40 animate-pop drop-shadow-lg"
          />
          <p
            key={`${mood.id}-label`}
            className="font-display text-2xl animate-pop"
            style={{ color: mood.ink }}
          >
            I&apos;m Feeling {mood.feeling}
          </p>
        </div>

        {/* Curved node selector */}
        <div>
          <svg viewBox="0 0 320 120" className="w-full h-auto select-none">
            <path
              d="M30 40 Q160 110 290 40"
              fill="none"
              stroke={mood.ink}
              strokeOpacity="0.45"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1 15"
            />
            {MOODS.map((m, i) => {
              const [x, y] = DOTS[i];
              const active = i === activeIndex;
              return (
                <g
                  key={m.id}
                  onClick={() => onPick(m.id)}
                  className="cursor-pointer"
                  style={{ transition: "all .3s ease" }}
                >
                  {/* larger transparent hit area */}
                  <circle cx={x} cy={y} r="18" fill="transparent" />
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 12 : 7}
                    fill={mood.ink}
                    fillOpacity={active ? 1 : 0.5}
                  />
                  {active && <circle cx={x} cy={y} r="5" fill={mood.color} />}
                </g>
              );
            })}
          </svg>

          {/* Set Mood button */}
          <button
            onClick={onNext}
            className="mt-4 w-full rounded-full bg-white py-4 text-lg font-semibold
              text-neutral-800 flex items-center justify-center gap-2
              shadow-lg shadow-black/15 active:scale-[0.98] transition"
          >
            Set Mood
            <span
              className="inline-flex items-center justify-center w-5 h-5"
              style={{ color: mood.color }}
            >
              ✓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
