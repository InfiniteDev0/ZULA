"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { moodById, DEFAULT_MOOD_ID } from "../data/menu";

const STORAGE_KEY = "zula-flow";

const INITIAL = {
  name: "",
  mood: null,
  drink: null,
  rating: 0,
  reviewText: "",
  reviewed: false,
};

const FlowCtx = createContext(null);
export const useFlow = () => useContext(FlowCtx);

// Holds the flow state (persisted to localStorage) and paints the whole
// page with the current mood colour. Lives in the root layout so it stays
// mounted across route changes — the URL is what advances the steps.
export default function FlowProvider({ children }) {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return INITIAL;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? { ...INITIAL, ...JSON.parse(saved) } : INITIAL;
    } catch {
      return INITIAL;
    }
  });

  const set = (patch) => setState((s) => ({ ...s, ...patch }));
  const reset = () => setState(INITIAL);

  // True only after the client has mounted — avoids an SSR/localStorage mismatch.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore storage write failures */
    }
  }, [state, hydrated]);

  const pathname = usePathname();
  const isWelcome = pathname === "/";
  const moodObj = state.mood ? moodById(state.mood) : null;
  const pageColor = (moodObj ?? moodById(DEFAULT_MOOD_ID)).color;
  const paint = hydrated && !isWelcome;

  return (
    <FlowCtx.Provider value={{ state, set, reset, moodObj, hydrated }}>
      <main
        className="w-full h-dvh flex justify-center overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: paint ? pageColor : undefined }}
      >
        <div className="w-full max-w-md h-full flex flex-col">
          {/* Render steps only after hydration so restored state matches SSR. */}
          {hydrated ? children : null}
        </div>
      </main>
    </FlowCtx.Provider>
  );
}
