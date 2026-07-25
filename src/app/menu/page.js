"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "../providers/FlowProvider";
import { moodById, specialForMood } from "../data/menu";
import MenuStep from "../components/steps/MenuStep";

export default function MenuPage() {
  const router = useRouter();
  const { state, set } = useFlow();

  // If someone lands here without a mood, send them to pick one.
  useEffect(() => {
    if (!state.mood) router.replace("/mood");
  }, [state.mood, router]);

  if (!state.mood) return null;

  const moodObj = moodById(state.mood);
  const special = specialForMood(state.mood);
  const firstName = state.name.trim().split(" ")[0] || "friend";

  return (
    <MenuStep
      firstName={firstName}
      moodObj={moodObj}
      special={special}
      initialSelected={state.cart.map((i) => i.id)}
      onConfirm={(items) => {
        set({ cart: items });
        router.push("/order");
      }}
      onFullMenu={() => router.push("/full-menu")}
    />
  );
}
