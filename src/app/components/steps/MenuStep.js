import { useState } from "react";
import {
  drinksForMood,
  dessertsForMood,
  dessertForMood,
} from "../../data/menu";
import { money } from "../../lib/format";
import Carousel from "../ui/Carousel";
import { Button } from "../ui/button";

// Step 2 — pick one or more items for the mood from the carousel. The
// signature drink is featured as "Recommended". The full menu is its own page.
export default function MenuStep({
  moodObj,
  special,
  initialSelected = [],
  onConfirm,
  onFullMenu,
}) {
  const dessert = dessertForMood(moodObj.id);
  const others = drinksForMood(moodObj.id).filter((d) => d.id !== special.id);
  const cards = [
    { ...special, tint: moodObj.color, recommended: true },
    { ...dessert, tint: moodObj.color },
    ...others.map((d) => ({ ...d, tint: moodObj.color })),
  ];

  const fullMenu = [...drinksForMood(moodObj.id), ...dessertsForMood(moodObj.id)];

  const [index, setIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState(initialSelected);

  const toggle = (id) =>
    setSelectedIds((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const selectedItems = fullMenu.filter((d) => selectedIds.includes(d.id));
  const total = selectedItems.reduce((sum, d) => sum + d.price, 0);

  const confirm = () => {
    if (selectedItems.length) onConfirm(selectedItems);
  };

  return (
    <section
      className="animate-rise h-full flex flex-col justify-between pt-4 pb-6"
      style={{ color: moodObj.ink }}
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex flex-col">
          <h1 className="display-md">Our Specials</h1>
          <p>Our purple makes u feel better</p>
        </div>
        <img className="w-15" src="/zula.png" alt="" />
      </div>

      <div className="min-h-0 flex flex-col items-center justify-center gap-3">
        <Carousel
          cards={cards}
          index={index}
          setIndex={setIndex}
          ink={moodObj.ink}
          selectedIds={selectedIds}
          onToggle={toggle}
        />
      </div>

      <div className="shrink-0 flex flex-col gap-3 px-6">
        <Button
          onClick={confirm}
          disabled={selectedItems.length === 0}
          className="w-full rounded-md bg-white py-4 text-2xl display-2xl h-12
            font-semibold text-neutral-900 shadow-lg shadow-black/15
            active:scale-[0.98] transition hover:bg-white
            disabled:opacity-40 disabled:pointer-events-none"
        >
          {selectedItems.length
            ? `Order ${selectedItems.length} · ${money(total)}`
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
    </section>
  );
}
