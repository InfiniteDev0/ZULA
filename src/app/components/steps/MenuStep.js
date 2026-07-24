import { useState } from "react";
import {
  drinksForMood,
  dessertsForMood,
  dessertForMood,
} from "../../data/menu";
import { money } from "../../lib/format";
import Flashcards from "../ui/Flashcards";
import { Button } from "../ui/button";

// Step 2 — recommend the mood's signature drink + a dessert as swipeable
// flashcards, with a button to open the full menu for this mood.
export default function MenuStep({
  firstName,
  moodObj,
  special,
  onSelect,
  onNext,
}) {
  const dessert = dessertForMood(moodObj.id);
  const cards = [
    { ...special, badge: "Best drink for your mood", tint: moodObj.color },
    { ...dessert, badge: "Sweet pairing", tint: moodObj.color },
  ];

  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const fullMenu = [...drinksForMood(moodObj.id), ...dessertsForMood(moodObj.id)];

  const choose = (item) => {
    onSelect(item);
    onNext();
  };

  return (
    <section
      className="animate-rise h-full flex flex-col px-6 pt-8 pb-6"
      style={{ color: moodObj.ink }}
    >
      <div className="text-center shrink-0">
        <h1 className="display-xl">Our Recommendation</h1>
        <p className="text-sm opacity-75 mt-1">
          Picked for your {moodObj.feeling.toLowerCase()} mood, {firstName}.
        </p>
      </div>

      {showAll ? (
        /* -------- Full menu list -------- */
        <div className="flex-1 min-h-0 flex flex-col mt-5">
          <div className="flex-1 min-h-0 overflow-y-auto zula-scroll flex flex-col gap-2 pr-1">
            {fullMenu.map((d) => (
              <button
                key={d.id}
                onClick={() => choose(d)}
                className="w-full text-left rounded-2xl bg-white/90 hover:bg-white
                  p-4 flex items-center gap-3 transition active:scale-[0.99]"
              >
                <span className="text-2xl">{d.emoji}</span>
                <span className="flex-1">
                  <span className="block font-semibold text-neutral-900">
                    {d.name}
                  </span>
                  <span className="block text-xs text-neutral-500">{d.line}</span>
                </span>
                <span className="font-semibold text-neutral-900 whitespace-nowrap">
                  {money(d.price)}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAll(false)}
            className="mt-3 text-sm underline underline-offset-4 opacity-80"
          >
             Back to recommendation
          </button>
        </div>
      ) : (
        /* -------- Recommendation flashcards -------- */
        <>
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <Flashcards
              cards={cards}
              index={index}
              setIndex={setIndex}
              ink={moodObj.ink}
            />
          </div>

          <div className="shrink-0 flex flex-col gap-3">
            <Button
              onClick={() => choose(cards[index])}
              className="w-full rounded-full bg-white py-4 text-3xl display-2xl h-15 font-semibold
                text-neutral-900 shadow-lg shadow-black/15 active:scale-[0.98] transition"
            >
              Order this
            </Button>
            <Button
              onClick={() => setShowAll(true)}
              className="w-full rounded-full border-2 py-3 text-2xl display-md h-15 font-medium 
              "
              style={{ borderColor: moodObj.ink, color: moodObj.ink }}
            >
              See our full menu
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
