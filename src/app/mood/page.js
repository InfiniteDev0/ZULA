"use client";

import { useRouter } from "next/navigation";
import { useFlow } from "../providers/FlowProvider";
import MoodStep from "../components/steps/MoodStep";

export default function MoodPage() {
  const router = useRouter();
  const { state, set } = useFlow();
  const firstName = state.name.trim().split(" ")[0] || "friend";

  return (
    <MoodStep
      firstName={firstName}
      selected={state.mood}
      onPick={(mood) => set({ mood, cart: [] })}
      onNext={() => router.push("/menu")}
    />
  );
}
