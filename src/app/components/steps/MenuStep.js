import { useState } from "react";
import { drinksForMood, dessertForMood, ALL_ITEMS } from "../../data/menu";
import { money } from "../../lib/format";
import { useFlow } from "../../providers/FlowProvider";
import Carousel from "../ui/Carousel";
import OrderSheet from "../OrderSheet";
import { Button } from "../ui/button";

// Step 2 — pick items for the mood from the carousel, then review them in the
// shared order sheet. The signature drink leads as "Recommended".
export default function MenuStep({ moodObj, special, onFullMenu }) {
  const { state, set } = useFlow();

  const dessert = dessertForMood(moodObj.id);
  const others = drinksForMood(moodObj.id).filter((d) => d.id !== special.id);
  const cards = [
    { ...special, tint: moodObj.color, recommended: true },
    { ...dessert, tint: moodObj.color },
    ...others.map((d) => ({ ...d, tint: moodObj.color })),
  ];

  const [index, setIndex] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  const cartIds = state.cart.map((c) => c.id);
  const total = state.cart.reduce((sum, i) => sum + i.price, 0);

  const toggle = (id) => {
    if (state.placed) return; // locked while the waiter is making it
    const item = ALL_ITEMS.find((i) => i.id === id);
    if (!item) return;
    set({
      cart: cartIds.includes(id)
        ? state.cart.filter((c) => c.id !== id)
        : [...state.cart, item],
    });
  };

  return (
    <section
      className="animate-rise relative h-full flex flex-col pt-4 pb-6"
      style={{ color: moodObj.ink }}
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex flex-col">
          <h1 className="display-md">Our Specials</h1>
          <p>Our purple makes u feel better</p>
        </div>
        <img className="w-15" src="/zula.png" alt="" />
      </div>

      <div className="h-full flex flex-col items-center justify-center gap-3">
        <Carousel
          cards={cards}
          index={index}
          setIndex={setIndex}
          ink={moodObj.ink}
          selectedIds={cartIds}
          onToggle={toggle}
        />
      </div>

      <div className="shrink-0 flex flex-col gap-3 px-6">
        <Button
          onClick={() => setSheetOpen(true)}
          disabled={state.cart.length === 0}
          className="w-full rounded-md bg-white py-4 text-2xl display-2xl h-12
            font-semibold text-neutral-900 shadow-lg shadow-black/15
            active:scale-[0.98] transition hover:bg-white
            disabled:opacity-40 disabled:pointer-events-none"
        >
          {state.cart.length
            ? `My picks (${state.cart.length}) · ${money(total)}`
            : "Select a drink"}
        </Button>
        <Button
          onClick={onFullMenu}
          className="w-full rounded-md border-2 py-3 text-2xl display-md h-12
            font-medium bg-transparent"
          style={{ borderColor: moodObj.ink, color: moodObj.ink }}
        >
          See our full menu
        </Button>
      </div>

      <OrderSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        accent={moodObj.color}
      />
    </section>
  );
}
