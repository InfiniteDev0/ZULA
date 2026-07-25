"use client";

import { X } from "lucide-react";
import { useFlow } from "../providers/FlowProvider";
import { money } from "../lib/format";
import { Button } from "./ui/button";

// Bottom sheet to review your picks before continuing. Editing (remove) is
// allowed here; `onContinue` moves the flow forward (to the mood step).
export default function OrderSheet({
  open,
  onClose,
  onContinue,
  accent = "#7C5CC4",
}) {
  const { state, set } = useFlow();
  const { cart } = state;
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  if (!open) return null;

  const remove = (id) => set({ cart: cart.filter((i) => i.id !== id) });

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white text-neutral-900 rounded-t-3xl p-5 max-h-[85%] flex flex-col animate-rise">
        <div className="w-10 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between shrink-0">
          <h3 className="display-md">Your picks</h3>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        <p className="text-neutral-500 text-xs mt-1 mb-2 shrink-0">
          Review your picks — you&apos;ll set your mood next.
        </p>

        <div className="flex-1 min-h-0 overflow-y-auto zula-scroll divide-y divide-neutral-100">
          {cart.length === 0 && (
            <p className="text-neutral-400 text-sm py-8 text-center">
              Nothing here yet — tap a card to add it.
            </p>
          )}
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-3">
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold leading-tight">{item.name}</p>
                <p className="text-neutral-500 text-xs">{money(item.price)}</p>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
                aria-label={`Remove ${item.name}`}
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-200 mt-2 pt-3 flex items-center justify-between shrink-0">
          <span className="display-md">Total</span>
          <span className="display-md">{money(total)}</span>
        </div>

        <Button
          onClick={onContinue}
          disabled={cart.length === 0}
          className="mt-4 w-full rounded-full h-15 display-xl text-xl tracking-wide py-4"
          
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
