"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ShoppingBag, X } from "lucide-react";
import { useFlow } from "../providers/FlowProvider";
import {
  SECTIONS,
  ALL_ITEMS,
  itemsForSection,
  specialForMood,
  moodById,
  DEFAULT_MOOD_ID,
} from "../data/menu";
import { money } from "../lib/format";
import Carousel from "../components/ui/Carousel";
import FlipText from "../components/ui/FlipText";

export default function FullMenuPage() {
  const router = useRouter();
  const { state, set } = useFlow();

  const moodObj = moodById(state.mood) || moodById(DEFAULT_MOOD_ID);
  const special = specialForMood(state.mood || DEFAULT_MOOD_ID);

  // Build each section's items; lead the Specials section with the mood pick.
  const sections = SECTIONS.map((sec) => {
    let items = itemsForSection(sec.id).map((i) => ({ ...i, tint: moodObj.color }));
    if (sec.id === "specials" && special) {
      items = [
        { ...special, tint: moodObj.color, recommended: true },
        ...items.filter((i) => i.id !== special.id),
      ];
    }
    return { ...sec, items };
  });

  const scrollRef = useRef(null);
  const secRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const cartIds = state.cart.map((c) => c.id);
  const total = state.cart.reduce((sum, c) => sum + c.price, 0);

  const toggleCart = (id) => {
    const item = ALL_ITEMS.find((i) => i.id === id);
    if (!item) return;
    set({
      cart: cartIds.includes(id)
        ? state.cart.filter((c) => c.id !== id)
        : [...state.cart, item],
    });
  };

  const removeFromCart = (id) =>
    set({ cart: state.cart.filter((c) => c.id !== id) });

  // Scroll-spy: flip the header to whichever section is at the top.
  const onScroll = () => {
    const cont = scrollRef.current;
    if (!cont) return;
    const y = cont.scrollTop + 100;
    let idx = 0;
    secRefs.current.forEach((el, i) => {
      if (el && el.offsetTop <= y) idx = i;
    });
    setActive((p) => (p === idx ? p : idx));
  };

  const jumpTo = (i) => {
    secRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <section className="relative h-full flex flex-col bg-[#170021] text-white">
      {/* Header — title + subtitle flip with the current section */}
      <header className="shrink-0 flex items-start justify-between p-5">
        <div className="flex flex-col">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="display-md flex items-center gap-2"
          >
            <FlipText>{sections[active].title}</FlipText>
            <ChevronDown
              className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>
          <FlipText className="text-sm text-white/60">
            {sections[active].subtitle}
          </FlipText>
        </div>
        <img className="w-14" src="/zula.png" alt="ZULA" />
      </header>

      {/* Section jump menu */}
      {menuOpen && (
        <div className="absolute z-30 top-20 left-5 bg-[#2a0f42] rounded-2xl p-2 flex flex-col min-w-44 border border-white/10">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jumpTo(i)}
              className={`text-left px-4 py-2.5 rounded-xl transition ${
                i === active ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      )}

      {/* Scrolling sections, one carousel each */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="relative flex-1 min-h-0 overflow-y-auto zula-scroll pb-28"
      >
        {sections.map((sec, i) => (
          <div
            key={sec.id}
            ref={(el) => {
              secRefs.current[i] = el;
            }}
            className="pt-6"
          >
            <h2 className="px-5 mb-3 text-lg display-lg font-semibold text-white/90">
              {sec.title}
            </h2>
            <Carousel
              cards={sec.items}
              ink={moodObj.color}
              selectedIds={cartIds}
              onToggle={toggleCart}
              showDots={false}
              align="start"
            />
          </div>
        ))}
      </div>

      {/* Floating basket (no shadow) */}
      {state.cart.length > 0 && !sheetOpen && (
        <button
          onClick={() => setSheetOpen(true)}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30
            flex items-center justify-center gap-3 rounded-full px-6 py-3 font-semibold text-white bg-purple-500/50 w-3/4 backdrop-blur-lg"
        >
          <ShoppingBag size={18} />
          {state.cart.length} · {money(total)}
        </button>
      )}

      {/* Order sheet */}
      {sheetOpen && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSheetOpen(false)}
          />
          <div className="relative bg-white text-neutral-900 rounded-t-3xl p-5 max-h-[75%] flex flex-col animate-rise">
            <div className="w-10 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-3">
              <h3 className="display-md">Your basket</h3>
              <button onClick={() => setSheetOpen(false)} aria-label="Close">
                <X />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto zula-scroll divide-y divide-neutral-100">
              {state.cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold leading-tight">{item.name}</p>
                    <p className="text-neutral-500 text-xs">{money(item.price)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-400 hover:text-neutral-700 p-1"
                    aria-label={`Remove ${item.name}`}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 mt-2 pt-3 flex items-center justify-between">
              <span className="display-md">Total</span>
              <span className="display-md">{money(total)}</span>
            </div>

            <button
              onClick={() => router.push("/order")}
              className="mt-4 w-full rounded-full py-4 text-lg font-semibold text-white"
              style={{ background: moodObj.color }}
            >
              Place order 
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
