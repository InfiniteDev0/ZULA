"use client";

import { useEffect, useRef, useState } from "react";
import { money } from "../../lib/format";

const THRESHOLD = 120; // px past which a release counts as a swipe

// Tinder-style deck. `order[0]` is the front (draggable) card; swiping it
// past the threshold flings it off, then it cycles to the back of the deck.
export default function Flashcards({ cards, setIndex, ink }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [exiting, setExiting] = useState(null); // "left" | "right" | null
  const [resetId, setResetId] = useState(null); // card to snap without transition
  const start = useRef(null);
  const dragging = start.current != null;

  // Report the current front card index up to the parent.
  useEffect(() => {
    setIndex?.(order[0]);
  }, [order, setIndex]);

  const onDown = (e) => {
    if (exiting) return;
    start.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!start.current) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };
  const onUp = () => {
    start.current = null;
    if (Math.abs(drag.x) > THRESHOLD) {
      const dir = drag.x > 0 ? "right" : "left";
      const frontId = cards[order[0]].id;
      setExiting(dir);
      setTimeout(() => {
        setResetId(frontId); // becomes a back card without sliding in
        setOrder((o) => [...o.slice(1), o[0]]);
        setDrag({ x: 0, y: 0 });
        setExiting(null);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setResetId(null))
        );
      }, 300);
    } else {
      setDrag({ x: 0, y: 0 }); // snap back to centre
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="relative w-64 h-80">
        {order.map((cardIdx, pos) => {
          const card = cards[cardIdx];
          const isFront = pos === 0;

          let transform;
          let transition;
          if (isFront && exiting) {
            const off = exiting === "right" ? 700 : -700;
            transform = `translate(${off}px, ${drag.y}px) rotate(${off * 0.03}deg)`;
            transition = "transform .3s ease-out, opacity .3s ease-out";
          } else if (isFront) {
            transform = `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x * 0.06}deg)`;
            transition = dragging ? "none" : "transform .3s ease";
          } else {
            transform = `translate(${pos * 6}px, ${pos * 12}px) scale(${1 - pos * 0.05})`;
            transition = "transform .3s ease";
          }
          if (card.id === resetId) transition = "none";

          return (
            <div
              key={card.id}
              onPointerDown={isFront ? onDown : undefined}
              onPointerMove={isFront ? onMove : undefined}
              onPointerUp={isFront ? onUp : undefined}
              onPointerCancel={isFront ? onUp : undefined}
              style={{
                transform,
                transition,
                zIndex: order.length - pos,
                opacity: isFront && exiting ? 0 : 1,
                boxShadow: "0 10px 25px rgba(0,0,0,0.14)",
              }}
              className={`absolute inset-0 rounded-3xl bg-white flex flex-col
                items-center justify-center gap-3 p-6 select-none
                ${isFront ? "touch-none cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
            >
              <span
                className="text-[11px] font-medium rounded-full px-3 py-1"
                style={{ background: `${card.tint}22`, color: card.tint }}
              >
                {card.badge}
              </span>
              <span className="text-7xl leading-none">{card.emoji}</span>
              <h3 className="display-lg text-neutral-900 text-center leading-none">
                {card.name}
              </h3>
              <p className="text-neutral-500 text-xs text-center px-1">
                {card.desc}
              </p>
              <p className="font-semibold text-lg text-neutral-900">
                {money(card.price)}
              </p>
            </div>
          );
        })}
      </div>

      {/* pagination dots */}
      <div className="flex gap-2">
        {cards.map((c, i) => (
          <span
            key={c.id}
            className="h-2 rounded-full transition-all"
            style={{
              width: order[0] === i ? 24 : 8,
              background: ink,
              opacity: order[0] === i ? 1 : 0.45,
            }}
          />
        ))}
      </div>

      <p className="text-sm opacity-70" style={{ color: ink }}>
        Swipe the card left or right
      </p>
    </div>
  );
}
