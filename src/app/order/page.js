"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "../providers/FlowProvider";
import { moodById } from "../data/menu";
import OrderStep from "../components/steps/OrderStep";

export default function OrderPage() {
  const router = useRouter();
  const { state } = useFlow();
  const empty = state.cart.length === 0;

  // Nothing selected yet? Back to the menu.
  useEffect(() => {
    if (empty) router.replace("/menu");
  }, [empty, router]);

  if (empty) return null;

  const moodObj = moodById(state.mood);
  const firstName = state.name.trim().split(" ")[0] || "friend";

  return (
    <OrderStep
      firstName={firstName}
      cart={state.cart}
      moodObj={moodObj}
      onBack={() => router.push("/menu")}
      onPlace={() => router.push("/review")}
    />
  );
}
