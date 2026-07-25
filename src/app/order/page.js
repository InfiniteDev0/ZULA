"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "../providers/FlowProvider";
import { moodById, DEFAULT_MOOD_ID } from "../data/menu";
import { Highlighter } from "@/components/ui/highlighter";
import OrderTicket from "../components/OrderTicket";

const PURPLE_BGS = ["/purple1.jpg", "/purple2.jpg", "/purple3.jpg", "/purple4.jpg"];
const BG_KEY = "zula-order-bg";

export default function OrderPage() {
  const router = useRouter();
  const { state } = useFlow();
  const empty = state.cart.length === 0;

  // Nothing chosen? Back to the menu.
  useEffect(() => {
    if (empty) router.replace("/full-menu");
  }, [empty, router]);

  // Assign one random purple background per user, then keep it.
  const [bg] = useState(() => {
    try {
      let saved = localStorage.getItem(BG_KEY);
      if (!saved) {
        saved = PURPLE_BGS[Math.floor(Math.random() * PURPLE_BGS.length)];
        localStorage.setItem(BG_KEY, saved);
      }
      return saved;
    } catch {
      return PURPLE_BGS[0];
    }
  });

  if (empty) return null;

  const name = state.name.trim() || "Guest";
  const moodObj = moodById(state.mood) || moodById(DEFAULT_MOOD_ID);
  const total = state.cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <section
      className="h-full w-full bg-cover bg-center flex flex-col items-center gap-6
        px-5 py-6 overflow-y-auto zula-scroll"
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div className="text-center">
        <h1 className="display-lg">Your Order</h1>
        <p className="display-md">
          <Highlighter action="underline" color="#000000">
            show your order to the barista
          </Highlighter>
        </p>
      </div>

      <OrderTicket
        cart={state.cart}
        total={total}
        name={name}
        mood={moodObj.label}
      />
    </section>
  );
}
