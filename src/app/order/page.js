"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "../providers/FlowProvider";
import { moodById } from "../data/menu";
import OrderStep from "../components/steps/OrderStep";

export default function OrderPage() {
  const router = useRouter();
  const { state } = useFlow();

  // No drink chosen yet? Back to the menu.
  useEffect(() => {
    if (!state.drink) router.replace("/menu");
  }, [state.drink, router]);

  if (!state.drink) return null;

  const moodObj = moodById(state.mood);
  const firstName = state.name.trim().split(" ")[0] || "friend";

  return (
    <OrderStep
      firstName={firstName}
      drink={state.drink}
      moodObj={moodObj}
      onBack={() => router.push("/menu")}
      onPlace={() => router.push("/review")}
    />
  );
}
