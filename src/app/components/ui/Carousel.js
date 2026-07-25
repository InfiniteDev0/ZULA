"use client";

import { useRef } from "react";
import { money } from "../../lib/format";

// Horizontal scroll-snap carousel. Cards are ~80% wide so the neighbour
// peeks on the side (like the reference). Native touch scroll = smooth swipe.
export default function Carousel({
  cards,
  index,
  setIndex,
  ink,
  selectedIds = [],
  onToggle,
  showDots = true,
  align = "center", // "center" peeks both sides; "start" left-aligns to px-5
}) {
  const ref = useRef(null);
  const pad = align === "start" ? "px-5" : "px-[10%]";
  const snap = align === "start" ? "snap-start" : "snap-center";

  const onScroll = () => {
    const el = ref.current;
    if (!el || !el.children.length) return;
    const child = el.children[0];
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const w = child.offsetWidth + gap;
    const i = Math.round(el.scrollLeft / w);
    if (i !== index) setIndex?.(i);
  };

  const scrollTo = (i) => {
    ref.current?.children[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        ref={ref}
        onScroll={onScroll}
        className={`w-full flex gap-4 overflow-x-auto snap-x snap-mandatory
          ${pad} py-2 [&::-webkit-scrollbar]:hidden`}
        style={{ scrollbarWidth: "none" }}
      >
        {cards.map((card) => {
          const selected = selectedIds.includes(card.id);
          return (
          <div key={card.id} className="snap-center shrink-0 w-[80%]">
            <button
              onClick={() => onToggle?.(card.id)}
              aria-pressed={selected}
              className="w-full h-72 flex flex-col text-left rounded-sm bg-white
                overflow-hidden active:scale-[0.99] transition"
              style={{
                outline: selected ? `2px solid ${ink}` : "none",
                outlineOffset: 2,
              }}
            >
              <div
                className="relative h-44 shrink-0 flex items-center justify-center"
                style={{ background: `${card.tint}22` }}
              >
                <span className="text-[5rem] leading-none">{card.emoji}</span>
                {card.recommended && (
                  <span
                    className="absolute top-3 left-3 text-[11px] font-semibold
                      rounded-sm px-3 py-1 text-white"
                    style={{ background: card.tint }}
                  >
                   Recommended
                  </span>
                )}

                {/* selection indicator (top-right) */}
                <span
                  className="absolute top-3 right-3 h-6 w-6 rounded-full flex
                    items-center justify-center transition-colors"
                  style={{
                    background: selected ? card.tint : "transparent",
                    border: selected
                      ? `2px solid ${card.tint}`
                      : "2px solid rgba(0,0,0,0.2)",
                  }}
                >
                  {selected && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col min-h-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="display-md text-neutral-900 leading-none">
                    {card.name}
                  </h3>
                  <span className="font-semibold text-neutral-900 whitespace-nowrap">
                    {money(card.price)}
                  </span>
                </div>
                <p className="text-neutral-500 text-xs mt-2 overflow-hidden">
                  {card.desc}
                </p>
              </div>
            </button>
          </div>
          );
        })}
      </div>

      {/* pagination dots */}
      {showDots && (
        <div className="flex gap-2">
          {cards.map((c, i) => (
            <button
              key={c.id}
              onClick={() => scrollTo(i)}
              aria-label={`Go to card ${i + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: index === i ? 24 : 8,
                background: ink,
                opacity: index === i ? 1 : 0.45,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
