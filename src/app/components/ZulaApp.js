"use client";

import { useState } from "react";
import { specialForMood, moodById, DEFAULT_MOOD_ID } from "../data/menu";
import Header from "./Header";
import Welcome from "./steps/Welcome";
import MoodStep from "./steps/MoodStep";
import MenuStep from "./steps/MenuStep";
import OrderStep from "./steps/OrderStep";
import ReviewStep from "./steps/ReviewStep";

const INITIAL = {
  step: "welcome",
  name: "",
  mood: null,
  drink: null,
  rating: 0,
  reviewText: "",
  reviewed: false,
};

// Orchestrator: owns the flow state and renders one step at a time.
export default function ZulaApp() {
  const [state, setState] = useState(INITIAL);
  const set = (patch) => setState((s) => ({ ...s, ...patch }));

  const { step, name, mood, drink, rating, reviewText, reviewed } = state;
  const firstName = name.trim().split(" ")[0] || "friend";
  const moodObj = mood ? moodById(mood) : null;
  const special = mood ? specialForMood(mood) : null;

  // The whole page adopts the mood colour (defaults to Normal).
  // The welcome screen keeps its own background image instead.
  const pageColor = (moodObj ?? moodById(DEFAULT_MOOD_ID)).color;
  const paintPage = step !== "welcome";

  return (
    <main
      className="w-full h-dvh flex justify-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: paintPage ? pageColor : undefined }}
    >
      <div className="w-full max-w-md h-full flex flex-col">

        {step === "welcome" && (
          <Welcome
            name={name}
            setName={(name) => set({ name })}
            onNext={() => set({ step: "mood" })}
          />
        )}

        {step === "mood" && (
          <MoodStep
            firstName={firstName}
            selected={mood}
            onPick={(mood) => set({ mood, drink: null })}
            onNext={() => set({ step: "menu" })}
          />
        )}

        {step === "menu" && moodObj && (
          <MenuStep
            firstName={firstName}
            moodObj={moodObj}
            special={special}
            selected={drink}
            onSelect={(drink) => set({ drink })}
            onBack={() => set({ step: "mood" })}
            onNext={() => set({ step: "order" })}
          />
        )}

        {step === "order" && drink && (
          <OrderStep
            firstName={firstName}
            drink={drink}
            moodObj={moodObj}
            onBack={() => set({ step: "menu" })}
            onPlace={() => set({ step: "review" })}
          />
        )}

        {step === "review" && (
          <ReviewStep
            firstName={firstName}
            drink={drink}
            rating={rating}
            setRating={(rating) => set({ rating })}
            reviewText={reviewText}
            setReviewText={(reviewText) => set({ reviewText })}
            reviewed={reviewed}
            onSubmit={() => set({ reviewed: true })}
            onRestart={() => setState(INITIAL)}
          />
        )}
      </div>
    </main>
  );
}
