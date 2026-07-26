"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { moodById, DEFAULT_MOOD_ID } from "../data/menu";

const STORAGE_KEY = "zula-flow";

const INITIAL = {
  name: "",
  mood: null,
  cart: [], // items the guest is choosing
  placed: false, // once true the order is locked — recheck only, no changes
  rating: 0,
  reviewText: "",
  reviewed: false,
  history: [], // past placed orders — never cleared
};

const FlowCtx = createContext(null);
export const useFlow = () => useContext(FlowCtx);

// Holds the flow state (persisted to localStorage) and paints the whole
// page with the current mood colour. Lives in the root layout so it stays
// mounted across route changes — the URL is what advances the steps.
// Mounted client-only (see ClientRoot), so localStorage is always available
// and there is no SSR tree to mismatch on refresh.
export default function FlowProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? { ...INITIAL, ...JSON.parse(saved) } : INITIAL;
    } catch {
      return INITIAL;
    }
  });

  const set = (patch) => setState((s) => ({ ...s, ...patch }));
  // Start a fresh order but keep the order history forever.
  const reset = () =>
    setState((s) => ({ ...INITIAL, history: s.history || [] }));

  // Persist progress whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore storage write failures */
    }
  }, [state]);

  const pathname = usePathname();
  const isWelcome = pathname === "/";
  const moodObj = state.mood ? moodById(state.mood) : null;
  const pageColor = (moodObj ?? moodById(DEFAULT_MOOD_ID)).color;

  return (
    <FlowCtx.Provider value={{ state, set, reset, moodObj }}>
      <main
        className="w-full h-dvh flex justify-center overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: isWelcome ? undefined : pageColor }}
      >
        <div className="w-full max-w-md h-full flex flex-col">{children}</div>
      </main>
    </FlowCtx.Provider>
  );
}
