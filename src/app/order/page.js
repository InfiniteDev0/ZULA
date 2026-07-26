"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "../providers/FlowProvider";
import { moodById, DEFAULT_MOOD_ID } from "../data/menu";
import { Highlighter } from "@/components/ui/highlighter";
import OrderTicket from "../components/OrderTicket";


export default function OrderPage() {
  const router = useRouter();
  const { state } = useFlow();
  const empty = state.cart.length === 0;

  // Nothing chosen? Back to the menu.
  useEffect(() => {
    if (empty) router.replace("/full-menu");
  }, [empty, router]);

  const bg = "/purple2.jpg";

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

      <h1 className="display-lg">Your Order</h1>
      <OrderTicket
        cart={state.cart}
        total={total}
        name={name}
        mood={moodObj.label}
      />
      <div className="text-center">
        <p className="display-xl">
          <Highlighter action="underline" color="#000000">
            show your order to the barista
          </Highlighter>
        </p>
      </div>
    </section>
  );
}
