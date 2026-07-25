"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { useFlow } from "../providers/FlowProvider";
import {
  SECTIONS,
  ALL_ITEMS,
  itemsForSection,
  specialForMood,
  todaySpecialLabel,
  moodById,
  DEFAULT_MOOD_ID,
} from "../data/menu";
import { money } from "../lib/format";
import Carousel from "../components/ui/Carousel";
import FlipText from "../components/ui/FlipText";
import OrderSheet from "../components/OrderSheet";
import Link from "next/link";

export default function FullMenuPage() {
  const router = useRouter();
  const { state, set } = useFlow();

  const moodObj = moodById(state.mood) || moodById(DEFAULT_MOOD_ID);
  const special = specialForMood(state.mood || DEFAULT_MOOD_ID);

  // Build each section's items; lead the Specials section with the mood pick.
  const sections = SECTIONS.map((sec) => {
    // Today's Special carousel: subtitle is the weekday nickname.
    const base =
      sec.id === "specials" ? { ...sec, subtitle: todaySpecialLabel() } : sec;
    let items = itemsForSection(sec.id).map((i) => ({ ...i, tint: moodObj.color }));
    if (sec.id === "specials" && special) {
      items = [
        { ...special, tint: moodObj.color, recommended: true },
        ...items.filter((i) => i.id !== special.id),
      ];
    }
    return { ...base, items };
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
    <section className="relative h-full flex flex-col bg-[#090008] text-white">
      {/* Header — title + subtitle flip with the current section */}
      <header className="shrink-0 flex items-start justify-between bg-black p-5">
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
          <FlipText className="text-sm text-purple-500">
            {sections[active].subtitle}
          </FlipText>
        </div>
        <Link href={"/"}>
          <img className="w-14" src="/zula.png" alt="ZULA" />
        </Link>
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
            <h2 className="px-5 mb-3 text-lg display-lg tracking-wide">
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

      {/* Floating basket → open the review sheet */}
      {state.cart.length > 0 && !sheetOpen && (
        <button
          onClick={() => setSheetOpen(true)}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30
            flex items-center justify-center gap-3 rounded-full px-6 py-3 font-semibold text-white bg-purple-500/50 backdrop-blur-lg w-3/4"
        >
          <ShoppingBag size={18} />
          {state.cart.length} · {money(total)}
        </button>
      )}

      {/* Review sheet → continue to the order page */}
      <OrderSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onContinue={() => router.push("/order")}
        accent={moodObj.color}
      />
    </section>
  );
}
